#!/usr/bin/env node

import chalk from "chalk"
import merge from "lodash/merge"
import camelCase from "lodash/camelCase"
import path from "path"
import { OptionsBase, CommandDef, HelpDef, MainDef, OptionDef } from "./options"
import { ArrayOr, asArray, color, colorCount, COLOR_CODE_LEN, wrap } from "./utils"
import { RequiredError } from "./errors"

export class Massarg<Options extends OptionsBase = OptionsBase> {
  private _main?: MainDef<Options>
  private _options: OptionDef<Options, any>[] = []
  private _commands: CommandDef<Options>[] = []
  private _runCommand?: CommandDef<Options>
  private _maxNameLen = 0
  /** These are the parsed options passed via args. They will only be available after using `parse()` or `printHelp()`. */
  public data: Options = { help: false } as Options

  private _help: Required<HelpDef> = {
    binName: undefined as any,
    normalColors: "dim",
    highlightColors: "yellow",
    titleColors: ["bold", "white"],
    subtitleColors: ["bold", "dim"],
    bodyColors: "white",
    printWidth: 80,
    header: "",
    footer: "",
    commandNameSeparator: " | ",
    optionNameSeparator: "|",
    useGlobalColumns: false,
    usageExample: "[command] [options]",
    useColors: true,
    includeDefaults: true,
  }
  private _requiredOptions: Record<"all" | string, Record<string, boolean>> = {}

  constructor() {
    this._options.push({
      name: "help",
      aliases: ["h"],
      defaultValue: false,
      description: "Display help information",
      parse: Boolean,
    })
  }

  /** Define the main command to run when no commands are passed. */
  public main(options: MainDef<Options>): Massarg<Options> {
    this._main = options
    return this
  }

  /** Add option to be parsed */
  public option<Value>(options: OptionDef<Options, Value>): Massarg<Options> {
    this._options.push(options)
    this._prepareRequired(options)
    return this
  }

  private _prepareRequired(options: OptionDef<Options, any>) {
    if (options.required) {
      if (options.commands?.length) {
        for (const command of this._optionCommands(options)) {
          this._requiredOptions[command.name] ??= {}
          this._requiredOptions[command.name][options.name] = true
        }
      } else {
        this._requiredOptions["all"] ??= {}
        this._requiredOptions["all"][options.name] = true
      }
    }
  }

  /** Add command to be run */
  public command(command: CommandDef<Options>): Massarg<Options> {
    this._commands.push(command)
    for (const opt of this._commandOptions(command)) {
      this._prepareRequired(opt)
    }
    return this
  }

  /** Set options for behavior of the help text print. */
  public help(options: HelpDef): Massarg<Options> {
    this._help = merge(this._help, options)
    return this
  }

  /**
   * Print the help text without being required to pass option.
   *
   * @param args If args weren't already parsed, you can add them here
   */
  public printHelp(args?: string[]): void {
    console.log(this.getHelpString(args).join("\n"))
  }

  public getHelpString(args?: string[]): string[] {
    const lines: string[] = []

    if (args?.length) {
      this.parseArgs(args)
    }

    const { bodyColors, highlightColors, normalColors, titleColors, binName, usageExample } = this._help

    lines.push(
      [
        this.color(titleColors, "Usage:"),
        this.color(highlightColors, binName ?? path.basename(process.argv[1])),
        this.color(normalColors, usageExample),
      ].join(" ")
    )

    if (this._help.header) {
      lines.push("")
      lines.push(this.color(bodyColors, this._help.header))
    }

    if (this._commands.length) {
      lines.push("")
      lines.push(this.color(titleColors, "Commands:"))
      lines.push("")
      lines.push(...this._printCommands())
    }

    lines.push(...this._printOptions())

    if (this._help.footer) {
      lines.push("")
      lines.push(this.color(bodyColors, this._help.footer))
    }

    return lines
  }

  public parseArgs(args = process.argv): Options {
    for (const option of this._options) {
      if (option.defaultValue !== undefined) {
        this._addOptionToData(option, option.defaultValue)
      } else if (option.array) {
        this._pushToArrayData(option)
      }
    }

    for (let i = 0; i < args.length; i++) {
      const arg = args[i]
      const option = this._options.find((o) => `--${o.name}` === arg || o.aliases?.map((a) => `-${a}`).includes(arg))

      if (option) {
        let defaultValue = option.defaultValue
        // detect boolean values
        option.boolean ??= option.parse === Boolean || [true, false].includes(defaultValue)
        option.array ??= Array.isArray(defaultValue)

        if (option.array && defaultValue === undefined) {
          defaultValue = []
        }

        let tempValue: any
        const hasNextToken = args.length > i + 1
        const nextTokenIsValue = hasNextToken && !args[i + 1].startsWith("-")
        const parse: NonNullable<OptionDef<Options, unknown>["parse"]> =
          option.parse ?? (option.boolean ? this._isTruthy : (a) => a)

        if (option.boolean && (!hasNextToken || !nextTokenIsValue)) {
          // parse boolean args w/o value
          tempValue = true
        } else if (!hasNextToken || !nextTokenIsValue) {
          // non-boolean args with no value
          throw new TypeError(`Missing value for: ${option.name}`)
        } else {
          // any args (incl. boolean) with value
          tempValue = args[i + 1]
          args.shift()
        }
        const value = parse(tempValue, this.data)
        this._addOptionToData(option, value)

        continue
      }

      const command = this._commands.find((o) => o.name === arg || o.aliases?.includes(arg))

      if (command) {
        if (this._runCommand) {
          // TODO add to extras?
          continue
        }
        this._runCommand = command
      }
    }
    return this.data
  }

  private _isTruthy(v: any): boolean {
    return [true, "1", "true", "yes", "on"].includes(v)
  }

  /**
   * Parse the given args, running any relevant commands in the process.
   *
   * @param args args to parse. Defaults to `process.argv`
   * @returns Parsed options
   */
  public parse(args?: string[]): Options {
    this.parseArgs(args)

    if (this.data.help) {
      this.printHelp()
      return this.data
    }

    try {
      if (this._runCommand) {
        this._ensureRequired(this._runCommand)
        this._runCommand.run(this.data)
      } else if (this._main) {
        this._ensureRequired()
        this._main(this.data)
      }
    } catch (e) {
      if (e.cmdName && e.fieldName) {
        console.log()
        console.error("Error")
        console.error(chalk.red`${e.message}`)
        process.exit(1)
      } else {
        throw e
      }
    }
    return this.data
  }

  private _ensureRequired(cmd?: CommandDef<Options>) {
    const cmdName = cmd ? cmd.name : "all"

    for (const optName in this._requiredOptions[cmdName]) {
      if (this._requiredOptions[cmdName][optName]) {
        throw new RequiredError(optName, cmdName)
      }
    }
  }

  private _addOptionToData(option: OptionDef<Options, any>, value: any) {
    const _d: Record<string, any> = this.data

    const set = (value: any) => {
      _d[option.name] = value
      _d[camelCase(option.name)] = value
      option.aliases?.forEach((a) => (_d[a] = value))
    }
    const push = (value: any) => {
      this._pushToArrayData(option, value)
    }
    if (!option.array) {
      // single value
      set(value)
    } else {
      // multiple values
      if (Array.isArray(value) && value.length) {
        for (const el of value) {
          push(el)
        }
      } else if (!Array.isArray(value)) {
        push(value)
      }
    }
    if (value !== option.defaultValue && value !== undefined) {
      for (const key in this._requiredOptions) {
        this._requiredOptions[key][option.name] = false
      }
    }
  }

  private _pushToArrayData(option: OptionDef<Options, any>, value?: any) {
    const _d: Record<string, any> = this.data

    const ccSame = camelCase(option.name) === option.name
    _d[option.name] ??= []
    _d[camelCase(option.name)] ??= []
    option.aliases?.forEach((a) => (_d[a] ??= []))

    if (value !== undefined) {
      _d[option.name].push(value)
      if (!ccSame) {
        _d[camelCase(option.name)].push(value)
      }
      option.aliases?.forEach((a) => _d[a].push(value))
    }
  }

  private _getWrappedLines(list: Array<{ name: string; description?: string }>): string[] {
    const { normalColors, highlightColors } = this._help
    const lines: string[] = []

    let maxNameLen = this._help.useGlobalColumns ? this._maxNameLen ?? 0 : 0
    for (const item of list) {
      if (item.name.length > maxNameLen) {
        maxNameLen = item.name.length
      }
    }
    if (this._help.useGlobalColumns) {
      this._maxNameLen = maxNameLen
    }

    const ARG_SPACE_LEN = 2
    const INDENT_LEN = 2
    const COLOR_COUNT = 2
    const nameFullSize = maxNameLen + ARG_SPACE_LEN + INDENT_LEN

    for (const item of list) {
      const cmdName = this.color(highlightColors, `${item.name}`).padEnd(
        nameFullSize + (COLOR_COUNT - 1) * COLOR_CODE_LEN,
        " "
      )
      const cmdDescr = this.color(normalColors, item.description ?? "")

      for (const line of wrap(cmdName + cmdDescr, {
        indent: nameFullSize + INDENT_LEN,
        colorCount: colorCount(normalColors, highlightColors),
        firstLineIndent: INDENT_LEN,
        printWidth: this._help.printWidth,
      })) {
        lines.push(line)
      }

      lines.push("")
    }

    return lines
  }

  private _printCommands(): string[] {
    const lines: string[] = []
    for (const line of this._getWrappedLines(
      this._commands.map((c) => ({ name: this._fullCmdName(c), description: c.description }))
    )) {
      if (line.length === 0 || line.trim().length) {
        lines.push(line)
      }
    }
    return lines
  }

  private _printOptions(): string[] {
    const lines: string[] = []

    const { titleColors, subtitleColors } = this._help

    const commandOpts: string[] = []

    commandOpts.push("")

    for (const cmd of this._commands) {
      const opts = this._commandOptions(cmd)
      if (opts.length) {
        if (commandOpts.length > 1) {
          commandOpts.push("")
        }
        commandOpts.push(this.color(subtitleColors, `${cmd.name}:`))
        commandOpts.push("")
        for (const line of this._getWrappedLines(
          opts.map((c) => ({ name: this._fullOptName(c), description: c.description }))
        )) {
          if (line.length === 0 || line.trim().length) {
            commandOpts.push(line)
          }
        }
      }
    }

    lines.push(this.color(titleColors, commandOpts.length ? "Command Options:" : "Options:"))

    for (const line of commandOpts) {
      lines.push(line)
    }

    const globalOpts = this._globalOptions()
    if (globalOpts.length) {
      if (commandOpts.length) {
        lines.push(this.color(titleColors, "Global Options:"))
        lines.push("")
      }
      for (const line of this._getWrappedLines(
        globalOpts.map((c) => ({ name: this._fullOptName(c), description: c.description }))
      )) {
        if (line.trim().length) {
          lines.push(line)
        }
      }
    }
    return lines
  }

  private _fullCmdName(cmd: CommandDef<Options>) {
    return [cmd.name, ...(cmd.aliases ?? [])].join(this._help.commandNameSeparator)
  }

  private _fullOptName(opt: OptionDef<Options, any>) {
    return [`--${opt.name}`, ...(opt.aliases ?? []).map((a) => `-${a}`)].join(this._help.optionNameSeparator)
  }

  private _commandOptions(cmd: CommandDef<Options>): OptionDef<Options, any>[] {
    return this._options.filter(
      (o) =>
        (asArray(o.commands).length && asArray(o.commands).includes(cmd.name)) ||
        cmd.aliases?.some((a) => asArray(o.commands).includes(a))
    )
  }

  private _optionCommands(opt: OptionDef<Options, any>): OptionDef<Options, any>[] {
    return this._commands.filter((c) => {
      return asArray(opt.commands).some((_c) => {
        return [c.name, ...(c.aliases ?? [])].includes(_c!)
      })
    })
  }

  private _globalOptions(): OptionDef<Options, any>[] {
    return this._options.filter((o) => !o.commands)
  }

  private color(color: ArrayOr<keyof typeof chalk>, ...text: any[]): string {
    if (!this._help.useColors) {
      return text.join(" ")
    }
    let output: string = undefined as any
    for (const c of asArray(color)) {
      output = (chalk[c as keyof typeof chalk] as typeof chalk.dim)(...(output ? [output] : text))
    }
    return chalk.reset(output)
  }
}

export function massarg<T extends OptionsBase = OptionsBase>() {
  return new Massarg<T>()
}

export default massarg
