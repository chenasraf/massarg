import { z } from "zod"
import { ValidationError } from "./error"
import MassargOption, { MassargFlag, MassargNumber, OptionConfig, OptionType } from "./option"
import { isZodError } from "./utils"

export const CommandConfig = <RunArgs extends z.ZodType>(args: RunArgs) =>
  z.object({
    name: z.string(),
    description: z.string(),
    aliases: z.string().array().optional(),
    run: z
      .function()
      .args(args)
      .returns(z.union([z.promise(z.void()), z.void()])) as z.ZodType<(args: z.infer<RunArgs>) => Promise<void> | void>,
  })

export type CommandConfig<T = unknown> = z.infer<ReturnType<typeof CommandConfig<z.ZodType<T>>>>

export type ArgsObject = Record<string, unknown>

export default class MassargCommand<Args extends ArgsObject = ArgsObject> {
  name: string
  description: string
  private aliases: string[]
  private _run?: (options: Args) => Promise<void> | void
  private options: MassargOption[] = []
  private commands: MassargCommand<any>[] = []
  private args: Partial<Args> = {}

  constructor(options: CommandConfig<Args>) {
    CommandConfig(z.any()).parse(options)
    this.name = options.name
    this.description = options.description
    this.aliases = options.aliases ?? []
    this._run = options.run
  }

  command(config: CommandConfig<Args>): MassargCommand<Args>
  command(config: MassargCommand<Args>): MassargCommand<Args>
  command(config: CommandConfig<Args> | MassargCommand<Args>): MassargCommand<Args> {
    try {
      const command = config instanceof MassargCommand ? config : new MassargCommand(config)
      this.commands.push(command)
      return this
    } catch (e) {
      if (isZodError(e)) {
        throw new ValidationError({
          path: [config.name, ...e.issues[0].path.map((p) => p.toString())],
          code: e.issues[0].code,
          message: e.issues[0].message,
        })
      }
      throw e
    }
  }

  option<T = string>(config: MassargOption<T>): MassargCommand<Args>
  option<T = string>(config: OptionConfig<T> & { type?: OptionType }): MassargCommand<Args>
  option<T = string>(config: (OptionConfig<T> & { type?: OptionType }) | MassargOption<T>): MassargCommand<Args> {
    const factory = () => {
      if (!("type" in config)) {
        return new MassargOption(config as OptionConfig<T>)
      }
      switch (config.type) {
        case "string":
          return new MassargOption<string>(config as OptionConfig<string>)
        case "number":
          return new MassargNumber(config as OptionConfig<number>)
        case "boolean":
          return new MassargFlag(config)
      }
    }
    try {
      const option = config instanceof MassargOption ? config : factory()
      this.options.push(option as MassargOption)
      return this
    } catch (e) {
      if (isZodError(e)) {
        throw new ValidationError({
          path: [config.name, ...e.issues[0].path.map((p) => p.toString())],
          code: e.issues[0].code,
          message: e.issues[0].message,
        })
      }
      throw e
    }
  }

  main(run: (options: Args) => Promise<void> | void): MassargCommand<Args> {
    this._run = run
    return this
  }

  parse(argv: string[], args?: Partial<Args>): Promise<void> | void {
    console.log("parse:", this.name)
    console.log(argv)
    this.args ??= {}
    this.args = { ...this.args, ...args }
    let _argv = [...argv]
    while (_argv.length) {
      const arg = _argv.shift()!
      console.log("parsing:", arg, _argv)
      if (arg.startsWith("-")) {
        console.log("option:", arg, _argv)
        _argv = this.parseOption(arg, _argv)
        continue
      }

      const command = this.commands.find((c) => c.name === arg || c.aliases.includes(arg))
      if (command) {
        console.log("command:", arg, _argv)
        return command.parse(_argv, this.args)
      }
      // TODO pass all un-handled args to an "args" option
      console.log("Nothing to do", arg, _argv)
    }
    if (this._run) {
      console.log("run:", this.args)
      this._run({ ...args, ...this.args } as Args)
    }
  }

  private parseOption(arg: string, argv: string[]): string[] {
    const option = this.options.find(
      (o) => (arg.startsWith("--") && o.name === arg.slice(2)) || o.aliases.includes(arg.slice(1)),
    )
    if (!option) {
      // TODO create custom error object
      throw new Error(`Unknown option ${arg}`)
    }
    const res = option.valueFromArgv([arg, ...argv])
    this.args[res.key as keyof Args] = res.value as Args[keyof Args]
    console.log("option response:", { value: res.value, argv: res.argv })
    return res.argv
  }

  getArgs(argv: string[]): Args {
    console.log("getArgs:", this.name)
    console.log(argv)
    return {} as Args
  }
}

export { MassargCommand }
