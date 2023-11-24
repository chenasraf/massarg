import { z } from 'zod'
import { isZodError, ParseError, ValidationError } from './error'
import { defaultHelpConfig, HelpConfig, HelpGenerator } from './help'
import {
  MassargOption,
  MassargFlag,
  OptionConfig,
  TypedOptionConfig,
  MassargHelpFlag,
} from './option'
import { DeepRequired, setOrPush, deepMerge } from './utils'
import { MassargExample, ExampleConfig } from './example'

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
  })

export type CommandConfig<T = unknown> = z.infer<ReturnType<typeof CommandConfig<z.ZodType<T>>>>

export type ArgsObject = Record<string, unknown>

export type Runner<Args extends ArgsObject> = <A extends ArgsObject = Args>(
  options: A,
  instance: MassargCommand<A>,
) => Promise<void> | void

/**
 * A command is a named function that can be invoked with a set of options.
 *
 * Commands can have sub-commands, which can have their own sub-commands, and so on.
 *
 * Options are not inherited by sub-commands, but their parsed values are passed down when
 * invoking a sub-command. This works recursively.
 */
export class MassargCommand<Args extends ArgsObject = ArgsObject> {
  name: string
  description: string
  aliases: string[]
  private _run?: Runner<Args>
  commands: MassargCommand<any>[] = []
  options: MassargOption[] = []
  examples: MassargExample[] = []
  args: Partial<Args> = {}
  private _helpConfig: HelpConfig
  parent?: MassargCommand<any>

  constructor(options: CommandConfig<Args>, parent?: MassargCommand<any>) {
    CommandConfig(z.any()).parse(options)
    this.name = options.name
    this.description = options.description
    this.aliases = options.aliases ?? []
    this._run = options.run
    this._helpConfig = {}
    this.parent = parent
  }

  get helpConfig(): DeepRequired<HelpConfig> {
    if (this.parent) {
      return deepMerge(this.parent.helpConfig, this._helpConfig)
    }
    return deepMerge(defaultHelpConfig, this._helpConfig) as Required<HelpConfig>
  }

  /**
   * Add a sub-command to this command.
   *
   * The sub-command will inherit all help configuration from the parent commands,
   * all the way up to the top-level command.
   *
   * While options are not inherited, they will be passed from any parent commands
   * to the sub-command when invoked.
   */
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
      command.parent = this
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

  /**
   * Adds a flag to this command.
   *
   * A flag is an option that is either present or not. It can be used to toggle
   * a boolean value, or to indicate that a command should be run in a different
   * mode.
   *
   * A flag can be negated by prefixing it with `no-`. For example, `--no-verbose`,
   * or by prefixing the alias with `^` instead of `-`. This is configurable via the command's
   * configuration.
   */
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

  /**
   * Adds an option to this command.
   *
   * An option is a named value that can be passed to a command. It can be
   * required or optional, and can be of any type.
   *
   * You can specify a default value for an option, which will be used if the
   * option is not passed to the command.
   *
   * You can also specify a parse function, which will be used to parse the
   * value passed to the command. This is useful if you want to parse a string
   * into a more complex type, or if you want to validate the value.
   */
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

  /**
   * Adds an example to this command.
   *
   * An example is a description of how to use the command, with an example input and output.
   *
   * At least one of `description`, `input` or `output` must be provided, but neither alone is
   * required.
   */
  example(config: ExampleConfig): MassargCommand<Args> {
    this.examples.push(new MassargExample(config))
    return this
  }

  /**
   * Configure the help output for this (and all child) commands.
   *
   * You can automatically bind the help command to this command, and/or bind the help option
   * to this command.
   *
   * If you don't opt-in to this behavior with `bindCommand` or `bindOption`, you can still
   * access the help output via `this.helpString()` and `this.printHelp()`.
   */
  help(config: HelpConfig): MassargCommand<Args> {
    this._helpConfig = HelpConfig.parse(config)

    if (this.helpConfig.bindCommand) {
      this.command(new MassargHelpCommand())
    }
    if (this.helpConfig.bindOption) {
      this.option(new MassargHelpFlag())
    }
    return this
  }

  /**
   * Configure the main function for this command. This command will run when no sub-commands
   * are provided.
   *
   * If none is provided, help will be printed.
   */
  main<A extends ArgsObject = Args>(run: Runner<A>): MassargCommand<Args> {
    this._run = run
    return this
  }

  /**
   * Parse the given arguments and run the command or sub-commands along with the given options
   * and flags.
   *
   * To parse the arguments without running any commands and only get the output args,
   * use `getArgs` instead.
   */
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

  /** Parse the given arguments and return the output args. */
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

  /**
   * Generate the help output for this command, and return it as a string.
   */
  helpString(): string {
    return new HelpGenerator(this).generate()
  }

  /**
   * Print the help output for this command.
   */
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
