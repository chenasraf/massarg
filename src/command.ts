import { z } from "zod"
import { isZodError, ParseError, ValidationError } from "./error"
import { HelpGenerator } from "./help"
import MassargOption, {
  MassargFlag,
  OptionConfig,
  TypedOptionConfig,
  MassargHelpFlag,
} from "./option"
import { setOrPush } from "./utils"

export const CommandConfig = <RunArgs extends z.ZodType>(args: RunArgs) =>
  z.object({
    name: z.string(),
    description: z.string(),
    aliases: z.string().array().optional(),
    run: z
      .function()
      .args(args, z.any())
      .returns(z.union([z.promise(z.void()), z.void()])) as z.ZodType<Runner<z.infer<RunArgs>>>,
    bindHelpCommand: z.boolean().optional(),
    bindHelpOption: z.boolean().optional(),
    // argsHint: z.string().optional(),
  })

export type CommandConfig<T = unknown> = z.infer<ReturnType<typeof CommandConfig<z.ZodType<T>>>>

export type ArgsObject = Record<string, unknown>

export type Runner<Args extends ArgsObject> = <A extends ArgsObject = Args>(
  options: A,
  instance: MassargCommand<A>,
) => Promise<void> | void

export default class MassargCommand<Args extends ArgsObject = ArgsObject> {
  name: string
  description: string
  aliases: string[]
  private _run?: Runner<Args>
  options: MassargOption[] = []
  commands: MassargCommand<any>[] = []
  args: Partial<Args> = {}

  constructor(options: CommandConfig<Args>) {
    CommandConfig(z.any()).parse(options)
    this.name = options.name
    this.description = options.description
    this.aliases = options.aliases ?? []
    this._run = options.run
    if (options.bindHelpCommand) {
      this.command(new MassargHelpCommand())
    }
    if (options.bindHelpOption) {
      this.option(new MassargHelpFlag())
    }
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

  flag(config: Omit<OptionConfig<boolean>, "parse">): MassargCommand<Args>
  flag(config: MassargFlag): MassargCommand<Args>
  flag(config: Omit<OptionConfig<boolean>, "parse"> | MassargFlag): MassargCommand<Args> {
    try {
      const flag = config instanceof MassargFlag ? config : new MassargFlag(config)
      this.options.push(flag as MassargOption)
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

  main<A extends ArgsObject = Args>(run: Runner<A>): MassargCommand<Args> {
    this._run = run
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
      const defaultOption = this.options.find((o) => o.isDefault)
      if (defaultOption) {
        console.log("Parsing default option")
        _argv = this.parseOption(`--${defaultOption.name}`, [arg, ..._argv])
        continue
      }
    }
    if (this._run) {
      this._run({ ...args, ...this.args } as Args, parent ?? this)
    }
  }

  private parseOption(arg: string, argv: string[]) {
    const option = this.options.find((o) => o._match(arg))
    if (!option) {
      throw new ValidationError({
        path: [MassargOption.getName(arg)],
        code: "unknown_option",
        message: "Unknown option",
      })
    }
    console.log("parseOption", [arg, ...argv])
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
            path: [MassargOption.getName(arg)],
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
    return new HelpGenerator(this).generate()
  }

  printHelp(): void {
    console.log(this.helpString())
  }
}

export class MassargHelpCommand<T extends ArgsObject = ArgsObject> extends MassargCommand<T> {
  constructor(config: Partial<Omit<CommandConfig<T>, "run">> = {}) {
    super({
      name: "help",
      aliases: ["h"],
      description: "Print help for this command, or a subcommand if specified",
      // argsHint: "[command]",
      run: (args, parent) => {
        if (args.command) {
          const command = parent.commands.find((c) => c.name === args.command)
          if (command) {
            command.printHelp()
            return
          } else {
            throw new ParseError({
              path: ["command"],
              code: "unknown_command",
              message: "Unknown command",
              received: args.command,
            })
          }
        }
        parent.printHelp()
      },
      ...config,
    })
    this.option({
      name: "command",
      aliases: ["c"],
      description: "Command to print help for",
      isDefault: true,
    })
  }
}

export { MassargCommand }
