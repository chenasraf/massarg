import chalk from "chalk"
import merge from "lodash/merge"
import path from "path"

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
}

export class Massarg<Options extends OptionsBase = OptionsBase> {
  private _main?: MainDef<Options>
  private _options: OptionDef<Options, any>[] = []
  private _commands: CommandDef<Options>[] = []
  private _runCommand?: CommandDef<Options>
  public data: Options = { help: false } as Options

  private _help: Required<HelpDef> = {
    binName: undefined as any,
    normalColor: "dim",
    highlightColor: "yellow",
    titleColor: "white",
    printWidth: 80,
  }

  constructor() {
    this._options.push({
      name: "help",
      aliases: ["h"],
      defaultValue: false,
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

  public printHelp(): void {
    const { highlightColor, normalColor, titleColor, binName } = this._help
    console.log(
      this._color(titleColor, chalk.bold`Usage:`),
      this._color(highlightColor, binName ?? path.basename(process.argv[1])),
      this._color(normalColor, "[command] [options]")
    )
  }

  private _color(color: keyof typeof chalk, ...text: any[]): string {
    return (chalk[color] as typeof chalk.dim)(...text)
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

        // parse boolean args
        if (option.boolean) {
          tempValue = true
        } else if (!hasNextToken || !nextTokenIsValue) {
          throw new TypeError(`Missing value for: ${option.name}`)
        } else {
          tempValue = args[i + 1]
          args.shift()
        }
        const parse: NonNullable<OptionDef<Options, unknown>["parse"]> = option.parse ?? ((a) => a)
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

  public parse(args = process.argv): void {
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
}

massarg()
  .help({
    binName: "my-cmd",
  })
  .option({
    name: "bool",
    aliases: ["b"],
    defaultValue: false,
    parse: Boolean,
  })
  .option({
    name: "number",
    aliases: ["n"],
    defaultValue: 0,
    parse: (v) => parseInt(v),
  })
  .command({ name: "do", run: console.log.bind(undefined, "do") })
  .main(console.log.bind(undefined, "main"))
  .parse()

export default massarg
