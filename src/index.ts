#!/usr/bin/env node
import chalk from "chalk"
import merge from "lodash/merge"
import { clearLine } from "node:readline"
import path from "path"
import { color, COLOR_CODE_LEN, wrap } from "./utils"

export function massarg() {
  return new Massarg()
}

export type OptionsBase = {
  help: boolean
}

export type MainDef<Options> = (options: Options) => void

export interface OptionDef<Options, Value> {
  name: string
  aliases?: string[]
  description?: string
  defaultValue?: Value
  boolean?: boolean
  command?: string
  parse?(value: string, options: Options): Value
}

export interface CommandDef<T> {
  name: string
  aliases?: string[]
  description?: string
  run(options: T): void
}

export interface HelpDef {
  printWidth?: number
  binName?: string
  normalColor?: keyof typeof chalk
  highlightColor?: keyof typeof chalk
  titleColor?: keyof typeof chalk
  header?: string
  footer?: string
  commandNameSeparator?: string
  optionNameSeparator?: string
  useGlobalColumns?: boolean
}

export class Massarg<Options extends OptionsBase = OptionsBase> {
  private _main?: MainDef<Options>
  private _options: OptionDef<Options, any>[] = []
  private _commands: CommandDef<Options>[] = []
  private _runCommand?: CommandDef<Options>
  private _maxNameLen = 0
  public data: Options = { help: false } as Options

  private _help: Required<HelpDef> = {
    binName: undefined as any,
    normalColor: "dim",
    highlightColor: "yellow",
    titleColor: "white",
    printWidth: 80,
    header: "",
    footer: "",
    commandNameSeparator: " | ",
    optionNameSeparator: "|",
    useGlobalColumns: false,
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

  public main(options: MainDef<Options>): Massarg<Options> {
    this._main = options
    return this
  }

  public option<Value>(options: OptionDef<Options, Value>): Massarg<Options> {
    this._options.push(options)
    return this
  }

  public command(options: CommandDef<Options>): Massarg<Options> {
    this._commands.push(options)
    return this
  }

  public help(options: HelpDef): Massarg<Options> {
    this._help = merge(this._help, options)
    return this
  }

  public printHelp(args?: string[]): void {
    this.parseArgs(args)

    const { highlightColor, normalColor, titleColor, binName } = this._help

    console.log(
      color(titleColor, chalk.bold`Usage:`),
      color(highlightColor, binName ?? path.basename(process.argv[1])),
      color(normalColor, "[command] [options]")
    )

    if (this._help.header) {
      console.log()
      console.log(color(titleColor, this._help.header))
    }

    if (this._commands.length) {
      console.log("")
      console.log(color(titleColor, chalk.bold`Commands:`))
      this._printCommands()
    }

    console.log()

    console.log(color(titleColor, chalk.bold`Options:`))
    this._printOptions()

    if (this._help.footer) {
      console.log()
      console.log(color(titleColor, this._help.footer))
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

        // parse boolean args
        if (option.boolean && (!hasNextToken || !nextTokenIsValue)) {
          tempValue = true
        } else if (!hasNextToken || !nextTokenIsValue) {
          throw new TypeError(`Missing value for: ${option.name}`)
        } else {
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
    _d[option.name] = value
    option.aliases?.forEach((a) => (_d[a] = value))
  }

  private _getWrappedLines(list: Array<{ name: string; description?: string }>): string[] {
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
      const cmdName = chalk.yellow(`${item.name}`).padEnd(nameFullSize + (COLOR_COUNT - 1) * COLOR_CODE_LEN, " ")
      const cmdDescr = chalk.dim(item.description ?? "")

      for (const line of wrap(cmdName + cmdDescr, {
        indent: nameFullSize + INDENT_LEN,
        colorCount: COLOR_COUNT,
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
    for (const line of this._getWrappedLines(
      this._options.map((c) => ({ name: this._fullOptName(c), description: c.description }))
    )) {
      if (line.trim().length) {
        console.log(line)
      }
    }
  }

  private _fullCmdName(cmd: CommandDef<Options>) {
    return [cmd.name, ...(cmd.aliases ?? [])].join(this._help.commandNameSeparator)
  }
  private _fullOptName(opt: OptionDef<Options, any>) {
    return [`--${opt.name}`, ...(opt.aliases ?? []).map((a) => `-${a}`)].join(this._help.optionNameSeparator)
  }
}

massarg()
  .help({
    // printWidth: 0,
    binName: "my-cmd",
    useGlobalColumns: true,
    header: "This is the app description",
    footer: "Copyright",
  })
  .option({
    name: "bool",
    aliases: ["b"],
    defaultValue: false,
    description: "This is a boolean arg. Supply it without value to set as true, or set value 0 for false",
    parse: Boolean,
  })
  .option({
    name: "number",
    aliases: ["n"],
    description: "This is a number arg, if you include this option, you must supply it with a value.",
    defaultValue: 0,
    parse: (v) => parseInt(v),
  })
  .command({
    name: "do-something",
    description: "This command does something. This description is just to fill the blanks. Don't kill the messenger.",
    aliases: ["do", "d"],
    run: console.log.bind(undefined, "do"),
  })
  .command({
    name: "my-custom-command",
    description:
      "This is another command that does something. It's a different one just to see more available. This " +
      "description is just to fill the blanks. Don't kill the messenger.",
    aliases: ["cc", "c"],
    run: console.log.bind(undefined, "do"),
  })
  .main(console.log.bind(undefined, "main"))
  .parse()

export default massarg
