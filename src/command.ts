import { z } from "zod"
import { ValidationError } from "./error"
import MassargOption, { MassargFlag, MassargNumber, OptionConfig, TypedOptionConfig } from "./option"
import { generateCommandsHelpTable, generateOptionsHelpTable, isZodError } from "./utils"

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

// export type RunFn<Args extends ArgsObject> = (options: Args) => Promise<void> | void

export default class MassargCommand<Args extends ArgsObject = ArgsObject> {
  name: string
  description: string
  aliases: string[]
  private _run?: (options: Args) => Promise<void> | void
  options: MassargOption[] = []
  commands: MassargCommand<any>[] = []
  args: Partial<Args> = {}

  constructor(options: CommandConfig<Args>) {
    CommandConfig(z.any()).parse(options)
    this.name = options.name
    this.description = options.description
    this.aliases = options.aliases ?? []
    this._run = options.run
  }

  command<A extends ArgsObject = Args>(config: CommandConfig<A>): MassargCommand<Args>
  command<A extends ArgsObject = Args>(config: MassargCommand<A>): MassargCommand<Args>
  command<A extends ArgsObject = Args>(config: CommandConfig<A> | MassargCommand<A>): MassargCommand<Args> {
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
  option<T = string>(config: TypedOptionConfig<T>): MassargCommand<Args>
  option<T = string>(config: TypedOptionConfig<T> | MassargOption<T>): MassargCommand<Args> {
    try {
      const option = config instanceof MassargOption ? config : MassargOption.fromTypedConfig(config)
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
      const found = this.options.some((o) => o._isOption(arg))
      if (found) {
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
    const option = this.options.find((o) => o._match(arg))

    if (!option) {
      // TODO create custom error object
      throw new Error(`Unknown option ${arg}`)
    }
    const res = option.valueFromArgv([arg, ...argv])
    console.log("option class name", option.constructor.name)
    if (option.isArray) {
      this.args[res.key as keyof Args] ??= [] as Args[keyof Args]
      const _a = this.args[res.key as keyof Args] as unknown[]
      _a.push(res.value) as Args[keyof Args]
    } else {
      this.args[res.key as keyof Args] = res.value as Args[keyof Args]
    }
    console.log("option response:", { value: res.value, argv: res.argv })
    return res.argv
  }

  getArgs(argv: string[]): Args {
    console.log("getArgs:", this.name)
    console.log(argv)
    return {} as Args
  }

  helpString(): string {
    const options = generateOptionsHelpTable(this.options)
    const commands = generateCommandsHelpTable(this.commands)
    return [
      `${this.name} - ${this.description}`,
      commands.length && "",
      commands.length && `Commands for ${this.name}:`,
      commands.length && commands,
      options.length && "",
      options.length && `Options for ${this.name}:`,
      options.length && options,
    ]
      .filter((s) => typeof s === "string")
      .join("\n")
  }
}

export { MassargCommand }
