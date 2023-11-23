import { z } from 'zod'
import { isZodError, ParseError, ValidationError } from './error'
import { defaultHelpConfig, HelpConfig, HelpGenerator } from './help'
import MassargOption, {
  MassargFlag,
  OptionConfig,
  TypedOptionConfig,
  MassargHelpFlag,
} from './option'
import { setOrPush, deepMerge } from './utils'
import MassargExample, { ExampleConfig } from './example'

export const CommandConfig = <RunArgs extends z.ZodType>(args: RunArgs) =>
  z.object({
    /** Command name */
    name: z.string(),
    /** Command description, displayed in the help output */
    description: z.string(),
    /** Command aliases */
    aliases: z.string().array().optional(),
    /**
     * Function used when invoking this command. It receives the parsed options and the primary
     * instance of Massarg used to invoke this command (the top-level instance)
     */
    run: z
      .function()
      .args(args, z.any())
      .returns(z.union([z.promise(z.void()), z.void()])) as z.ZodType<Runner<z.infer<RunArgs>>>,
    helpConfig: HelpConfig.optional(),
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
  commands: MassargCommand<any>[] = []
  options: MassargOption[] = []
  examples: MassargExample[] = []
  args: Partial<Args> = {}
  helpConfig: Required<HelpConfig>

  constructor(options: CommandConfig<Args>) {
    CommandConfig(z.any()).parse(options)
    this.name = options.name
    this.description = options.description
    this.aliases = options.aliases ?? []
    this._run = options.run
    this.helpConfig = HelpConfig.required().parse(defaultHelpConfig)
  }

  command<A extends ArgsObject = Args>(config: CommandConfig<A>): MassargCommand<Args>
  command<A extends ArgsObject = Args>(config: MassargCommand<A>): MassargCommand<Args>
  command<A extends ArgsObject = Args>(
    config: CommandConfig<A> | MassargCommand<A>,
  ): MassargCommand<Args> {
    try {
      const command = config instanceof MassargCommand ? config : new MassargCommand(config)
      const existing = this.commands.find((c) => c.name === command.name)
      if (existing) {
        throw new ValidationError({
          code: 'duplicate_command',
          message: `Command "${command.name}" already exists`,
          path: [this.name, command.name],
        })
      }
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

  flag(config: Omit<OptionConfig<boolean>, 'parse' | 'isDefault'>): MassargCommand<Args>
  flag(config: MassargFlag): MassargCommand<Args>
  flag(
    config: Omit<OptionConfig<boolean>, 'parse' | 'isDefault'> | MassargFlag,
  ): MassargCommand<Args> {
    try {
      const flag = config instanceof MassargFlag ? config : new MassargFlag(config)
      const existing = this.options.find((c) => c.name === flag.name)
      if (existing) {
        throw new ValidationError({
          code: 'duplicate_flag',
          message: `Flag "${flag.name}" already exists`,
          path: [this.name, flag.name],
        })
      }
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
      const existing = this.options.find((c) => c.name === option.name)
      if (existing) {
        throw new ValidationError({
          code: 'duplicate_option',
          message: `Option "${option.name}" already exists`,
          path: [this.name, option.name],
        })
      }
      if (option.isDefault) {
        const defaultOption = this.options.find((o) => o.isDefault)
        if (defaultOption) {
          throw new ValidationError({
            code: 'duplicate_default_option',
            message: `Option "${option.name}" cannot be set as default because option "${defaultOption.name}" is already set as default`,
            path: [this.name, option.name],
          })
        }
      }
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

  example(config: ExampleConfig): MassargCommand<Args> {
    this.examples.push(new MassargExample(config))
    return this
  }

  help(config: HelpConfig): MassargCommand<Args> {
    this.helpConfig = HelpConfig.required().parse(
      deepMerge(defaultHelpConfig, config) as HelpConfig,
    )

    if (this.helpConfig.bindCommand) {
      this.command(new MassargHelpCommand())
    }
    if (this.helpConfig.bindOption) {
      this.option(new MassargHelpFlag())
    }
    return this
  }

  main<A extends ArgsObject = Args>(run: Runner<A>): MassargCommand<Args> {
    this._run = run
    return this
  }

  parse(argv: string[], args?: Partial<Args>, parent?: MassargCommand<Args>): Promise<void> | void {
    this.getArgs(argv, args, parent, true)
  }

  private parseOption(arg: string, argv: string[]) {
    const option = this.options.find((o) => o._match(arg))
    if (!option) {
      throw new ValidationError({
        path: [MassargOption.getName(arg)],
        code: 'unknown_option',
        message: 'Unknown option',
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

  getArgs(
    argv: string[],
    __args?: Partial<Args>,
    parent?: MassargCommand<any>,
    parseCommands?: false,
  ): Promise<void> | void
  getArgs(
    argv: string[],
    __args?: Partial<Args>,
    parent?: MassargCommand<any>,
    parseCommands?: true,
  ): Args
  getArgs(
    argv: string[],
    args?: Partial<Args>,
    parent?: MassargCommand<any>,
    parseCommands = false,
  ): Args | Promise<void> | void {
    let _args: Args = { ...this.args, ...args } as Args
    let _argv = [...argv]
    const _a = this.args as Record<string, string[]>

    // fill defaults
    for (const option of this.options) {
      if (option.defaultValue !== undefined && _a[option.name] === undefined) {
        _args[option.name as keyof Args] = option.defaultValue as Args[keyof Args]
      }
    }

    // parse options
    while (_argv.length) {
      const arg = _argv.shift()!
      const found = this.options.some((o) => o._isOption(arg))
      if (found) {
        _argv = this.parseOption(arg, _argv)
        _args = { ..._args, ...this.args }
        continue
      }

      const command = this.commands.find((c) => c.name === arg || c.aliases.includes(arg))
      if (command) {
        // this is dry run, just exit
        if (!parseCommands) {
          break
        }
        // this is real run, parse command, pass unparsed args
        return command.parse(_argv, this.args, parent ?? this)
      }
      // default option - passes arg value even without flag name
      const defaultOption = this.options.find((o) => o.isDefault)
      if (defaultOption) {
        _argv = this.parseOption(`--${defaultOption.name}`, [arg, ..._argv])
        continue
      }
      // not parsed by any step, add to extra key
      _a.extra ??= []
      _a.extra.push(arg)
    }
    this.args = { ...this.args, ..._args }
    // dry run, just exit
    if (!parseCommands) {
      return this.args as Args
    }

    // no sub command found, run main command
    if (this._run) {
      this._run(this.args, parent ?? this)
    }
  }

  helpString(): string {
    return new HelpGenerator(this).generate()
  }

  printHelp(): void {
    console.log(this.helpString())
  }
}

export class MassargHelpCommand<T extends ArgsObject = ArgsObject> extends MassargCommand<T> {
  constructor(config: Partial<Omit<CommandConfig<T>, 'run'>> = {}) {
    super({
      name: 'help',
      aliases: ['h'],
      description: 'Print help for this command, or a subcommand if specified',
      // argsHint: "[command]",
      run: (args, parent) => {
        if (args.command) {
          const command = parent.commands.find((c) => c.name === args.command)
          if (command) {
            command.printHelp()
            return
          } else {
            throw new ParseError({
              path: ['command'],
              code: 'unknown_command',
              message: 'Unknown command',
              received: args.command,
            })
          }
        }
        parent.printHelp()
      },
      ...config,
    })
    this.option({
      name: 'command',
      aliases: ['c'],
      description: 'Command to print help for',
      isDefault: true,
    })
  }
}

export { MassargCommand }
