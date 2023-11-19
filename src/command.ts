import { z } from "zod"
import { ValidationError } from "./error"
import Massarg from "./massarg"
import MassargOption, { TypedOptionConfig } from "./option"
import { generateCommandsHelpTable, generateOptionsHelpTable, isZodError, setOrPush } from "./utils"

export const CommandConfig = <RunArgs extends z.ZodType>(args: RunArgs) =>
  z.object({
    name: z.string(),
    description: z.string(),
    aliases: z.string().array().optional(),
    run: z
      .function()
      .args(args, z.any())
      .returns(z.union([z.promise(z.void()), z.void()])) as z.ZodType<
      (args: z.infer<RunArgs>, instance: MassargCommand<z.infer<RunArgs>>) => Promise<void> | void
    >,
  })

export type CommandConfig<T = unknown> = z.infer<ReturnType<typeof CommandConfig<z.ZodType<T>>>>

export type ArgsObject = Record<string, unknown>

// export type RunFn<Args extends ArgsObject> = (options: Args) => Promise<void> | void

export default class MassargCommand<Args extends ArgsObject = ArgsObject> {
  name: string
  description: string
  aliases: string[]
  private _run?: <P extends ArgsObject = Args>(
    options: Args,
    instance: Massarg<P>,
  ) => Promise<void> | void
  options: MassargOption[] = []
  commands: MassargCommand<any>[] = []
  args: Partial<Args> = {}

  constructor(options: CommandConfig<Args>) {
    CommandConfig(z.any()).parse(options)
    this.name = options.name
    this.description = options.description
    this.aliases = options.aliases ?? []
    this._run = options.run as typeof this._run
  }

  command<A extends ArgsObject = Args>(config: CommandConfig<A>): MassargCommand<Args>
  command<A extends ArgsObject = Args>(config: MassargCommand<A>): MassargCommand<Args>
  command<A extends ArgsObject = Args>(
    config: CommandConfig<A> | MassargCommand<A>,
  ): MassargCommand<Args> {
    try {
      const command = config instanceof MassargCommand ? config : new MassargCommand(config)
      this.commands.push(command)
      return this
    } catch (e) {
      if (isZodError(e)) {
        throw new ValidationError({
          path: [this.name, config.name, ...e.issues[0].path.map((p) => p.toString())],
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
      const option =
        config instanceof MassargOption ? config : MassargOption.fromTypedConfig(config)
      this.options.push(option as MassargOption)
      return this
    } catch (e) {
      if (isZodError(e)) {
        throw new ValidationError({
          path: [this.name, config.name, ...e.issues[0].path.map((p) => p.toString())],
          code: e.issues[0].code,
          message: e.issues[0].message,
        })
      }
      throw e
    }
  }

  main<A extends ArgsObject = Args>(
    run: (options: Args, instance: MassargCommand<A>) => Promise<void> | void,
  ): MassargCommand<Args> {
    this._run = run as typeof this._run
    return this
  }

  parse(argv: string[], args?: Partial<Args>, parent?: MassargCommand<Args>): Promise<void> | void {
    this.args ??= {}
    this.args = { ...this.args, ...args }
    let _argv = [...argv]
    while (_argv.length) {
      const arg = _argv.shift()!
      const found = this.options.some((o) => o._isOption(arg))
      if (found) {
        _argv = this.parseOption(arg, _argv)
        continue
      }

      const command = this.commands.find((c) => c.name === arg || c.aliases.includes(arg))
      if (command) {
        return command.parse(_argv, this.args, parent ?? this)
      }
      // TODO pass all un-handled args to an "args" option
    }
    if (this._run) {
      this._run({ ...args, ...this.args } as Args, parent ?? this)
    }
  }

  private parseOption(arg: string, argv: string[]) {
    const option = this.options.find((o) => o._match(arg))
    if (!option) {
      throw new ValidationError({
        path: [arg],
        code: "unknown_option",
        message: "Unknown option",
      })
    }
    const res = option._parseDetails([arg, ...argv])
    this.args[res.key as keyof Args] = setOrPush<Args[keyof Args]>(
      res.value,
      this.args[res.key as keyof Args],
      option.isArray,
    )
    return res.argv
  }

  getArgs(argv: string[]): Args {
    let args: Args = {} as Args
    let _argv = [...argv]
    while (_argv.length) {
      const arg = _argv.shift()!
      const found = this.options.some((o) => o._isOption(arg))
      if (found) {
        const option = this.options.find((o) => o._match(arg))
        if (!option) {
          throw new ValidationError({
            path: [arg],
            code: "unknown_option",
            message: "Unknown option",
          })
        }
        const res = option._parseDetails(argv)
        args[res.key as keyof Args] = setOrPush<Args[keyof Args]>(
          res.value,
          args[res.key as keyof Args],
          option.isArray,
        )
        continue
      }

      const command = this.commands.find((c) => c.name === arg || c.aliases.includes(arg))
      if (command) {
        break
      }
    }
    return args
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

  printHelp(): void {
    console.log(this.helpString())
  }
}

export { MassargCommand }
