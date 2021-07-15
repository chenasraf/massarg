#!/usr/bin/env node

import chalk from "chalk"
import merge from "lodash/merge"
import camelCase from "lodash/camelCase"
import path from "path"
import { OptionsBase, CommandDef, HelpDef, MainDef, OptionDef } from "./options"
import { asArray, color, colorCount, COLOR_CODE_LEN, wrap } from "./utils"

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
    titleColors: "white",
    subtitleColors: ["bold", "dim"],
    printWidth: 80,
    header: "",
    footer: "",
    commandNameSeparator: " | ",
    optionNameSeparator: "|",
    useGlobalColumns: false,
    usageExample: "[command] [options]",
  }

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
    return this
  }

  /** Add command to be run */
  public command(options: CommandDef<Options>): Massarg<Options> {
    this._commands.push(options)
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
    if (args?.length) {
      this.parseArgs(args)
    }

    const { highlightColors, normalColors, titleColors, binName, usageExample } = this._help

    console.log(
      color(titleColors, chalk.bold`Usage:`),
      color(highlightColors, binName ?? path.basename(process.argv[1])),
      color(normalColors, usageExample)
    )

    if (this._help.header) {
      console.log()
      console.log(color(titleColors, this._help.header))
    }

    if (this._commands.length) {
      console.log("")
      console.log(color(titleColors, chalk.bold`Commands:`))
      this._printCommands()
    }

    console.log()
    this._printOptions()

    if (this._help.footer) {
      console.log()
      console.log(color(titleColors, this._help.footer))
    }
  }

  public parseArgs(args = process.argv): Options {
    for (const option of this._options) {
      if (option.defaultValue !== undefined) {
        this._addOptionToData(option, option.defaultValue)
      }
    }

    for (let i = 0; i < args.length; i++) {
      const arg = args[i]
      const option = this._options.find((o) => `--${o.name}` === arg || o.aliases?.map((a) => `-${a}`).includes(arg))

      if (option) {
        // detect boolean values
        option.boolean ??= option.parse === Boolean || [true, false].includes(option.defaultValue)

        let tempValue: any
        const hasNextToken = args.length > i + 1
        const nextTokenIsValue = hasNextToken && !args[i + 1].startsWith("-")
        const parse: NonNullable<OptionDef<Options, unknown>["parse"]> = option.parse ?? ((a) => a)

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

  /**
   * Parse the given args, running any relevant commands in the process.
   *
   * @param args args to parse. Defaults to `process.argv`
   * @returns Parsed options
   */
  public parse(args?: string[]): void {
    this.parseArgs(args)

    if (this.data.help) {
      this.printHelp()
      return
    }

    console.log("data", this.data)

    if (this._runCommand) {
      console.log("Running command", this._runCommand)
      this._runCommand.run(this.data)
    } else if (this._main) {
      console.log("Running main", this._main)
      this._main(this.data)
    }
  }

  private _addOptionToData(option: OptionDef<Options, any>, value: any) {
    const _d: Record<string, any> = this.data
    _d[camelCase(option.name)] = value
    option.aliases?.forEach((a) => (_d[a] = value))
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
      const cmdName = color(highlightColors, `${item.name}`).padEnd(
        nameFullSize + (COLOR_COUNT - 1) * COLOR_CODE_LEN,
        " "
      )
      const cmdDescr = color(normalColors, item.description ?? "")

      for (const line of wrap(cmdName + cmdDescr, {
        indent: nameFullSize + INDENT_LEN,
        colorCount: colorCount(normalColors, highlightColors),
        firstLineIndent: INDENT_LEN,
        printWidth: this._help.printWidth,
      })) {
        lines.push(line)
      }
    }

    return lines
  }

  private _printCommands() {
    for (const line of this._getWrappedLines(
      this._commands.map((c) => ({ name: this._fullCmdName(c), description: c.description }))
    )) {
      if (line.trim().length) {
        console.log(line)
      }
    }
  }

  private _printOptions() {
    let printedTitle = false
    const { titleColors, subtitleColors } = this._help

    const commandOpts: string[] = []

    for (const cmd of this._commands) {
      const opts = this._commandOptions(cmd)
      if (opts.length) {
        if (commandOpts.length) {
          commandOpts.push("")
        }
        commandOpts.push(color(subtitleColors, `${cmd.name}:`))
        for (const line of this._getWrappedLines(
          opts.map((c) => ({ name: this._fullOptName(c), description: c.description }))
        )) {
          if (line.trim().length) {
            commandOpts.push(line)
          }
        }
      }
    }

    console.log(color(titleColors, chalk.bold`${commandOpts.length ? "Command Options" : "Options"}:`))
    // if (commandOpts.length) {
    console.log()
    // }

    for (const line of commandOpts) {
      console.log(line)
    }

    const globalOpts = this._globalOptions()
    if (globalOpts.length) {
      if (commandOpts.length) {
        console.log(chalk.bold`Global Options:`)
        console.log()
      }
      for (const line of this._getWrappedLines(
        globalOpts.map((c) => ({ name: this._fullOptName(c), description: c.description }))
      )) {
        if (line.trim().length) {
          console.log(line)
        }
      }
    }
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

  private _globalOptions(): OptionDef<Options, any>[] {
    return this._options.filter((o) => !o.commands)
  }
}

export function massarg<T extends OptionsBase = OptionsBase>() {
  return new Massarg<T>()
}

export default massarg
