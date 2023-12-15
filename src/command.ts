import { z } from 'zod'
import { isZodError, ParseError, ValidationError } from './error'
import { defaultHelpConfig, HelpConfig, HelpGenerator } from './help'
import {
  MassargOption,
  MassargFlag,
  TypedOptionConfig,
  MassargHelpFlag,
  OPT_FULL_PREFIX,
  NEGATE_FULL_PREFIX,
  OPT_SHORT_PREFIX,
  NEGATE_SHORT_PREFIX,
  Prefixes,
  FlagConfig,
} from './option'
import { DeepRequired, setOrPush, deepMerge, getErrorMessage, capitalize } from './utils'
import { MassargExample, ExampleConfig } from './example'
import { format } from './style'

export const CommandConfig = <RunArgs extends ArgsObject = ArgsObject>(args: z.ZodType<RunArgs>) =>
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
      .returns(z.union([z.promise(z.void()), z.void()])) as z.ZodType<Runner<RunArgs>>,
    /** Prefix of options understood by this command */
    optionPrefix: z.string().default(OPT_FULL_PREFIX).optional(),
    /** Prefix of negated flags understood by this command */
    negateFlagPrefix: z.string().default(NEGATE_FULL_PREFIX).optional(),
    /** Prefix of aliases of options understood by this command */
    optionAliasPrefix: z.string().default(OPT_SHORT_PREFIX).optional(),
    /** Prefix of aliases of negated flags understood by this command */
    negateAliasPrefix: z.string().default(NEGATE_SHORT_PREFIX).optional(),
  })

export type CommandConfig<RunArgs extends ArgsObject = ArgsObject> = z.infer<
  ReturnType<typeof CommandConfig<RunArgs>>
>

export type ArgsObject = Record<string | number | symbol, any>

export type Runner<Args extends ArgsObject> = (
  options: Args,
  instance: MassargCommand<Args>,
) => Promise<void> | void

/**
 * A command is a named function that can be invoked with a set of options.
 *
 * Commands can have sub-commands, which can have their own sub-commands, and so on.
 *
 * Options are not inherited by sub-commands, but their parsed values are passed down when
 * invoking a sub-command. This works recursively.
 *
 * @example
 * ```ts
 * massarg(options).command({
 *   name: 'foo',
 *   description: 'foo command',
 *   run: (options, instance) => {
 *     console.log(options, instance)
 *   },
 * })
 * ```
 */
export class MassargCommand<Args extends ArgsObject = ArgsObject>
  implements Omit<CommandConfig<Args>, 'run'>
{
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
  optionPrefix = OPT_FULL_PREFIX
  negateFlagPrefix = NEGATE_FULL_PREFIX
  optionAliasPrefix = OPT_SHORT_PREFIX
  negateAliasPrefix = NEGATE_SHORT_PREFIX

  constructor(options: CommandConfig<Args>, parent?: MassargCommand<any>) {
    CommandConfig(z.any()).parse(options)
    this.name = options.name
    this.description = options.description
    this.aliases = options.aliases ?? []
    this._run = options.run
    this._helpConfig = {}
    this.parent = parent
  }

  get optionPrefixes(): Prefixes {
    return this.getPrefixes()
  }

  private getPrefixes(): Prefixes {
    return {
      optionPrefix: this.optionPrefix,
      aliasPrefix: this.optionAliasPrefix,
      negateFlagPrefix: this.negateFlagPrefix,
      negateAliasPrefix: this.negateAliasPrefix,
    }
  }

  get helpConfig(): DeepRequired<HelpConfig> {
    if (this.parent) {
      return deepMerge(this.parent.helpConfig, this._helpConfig)
    }
    return deepMerge(
      defaultHelpConfig,
      deepMerge(
        {
          optionOptions: {
            namePrefix: this.optionPrefix,
            aliasPrefix: this.optionAliasPrefix,
            negatePrefix: this.negateFlagPrefix,
            negateAliasPrefix: this.negateAliasPrefix,
          },
        } as Partial<HelpConfig>,
        this._helpConfig,
      ),
    ) as Required<HelpConfig>
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
  command<A extends ArgsObject = Args>(config: CommandConfig<A>): MassargCommand<Args & A>
  command<A extends ArgsObject = Args>(config: MassargCommand<A>): MassargCommand<Args & A>
  command<A extends ArgsObject = Args>(
    config: CommandConfig<A> | MassargCommand<A>,
  ): MassargCommand<Args & A> {
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
      return this as unknown as MassargCommand<Args & A>
    } catch (e) {
      if (isZodError(e)) {
        e = new ValidationError({
          path: [this.name, config.name, ...e.issues[0].path.map((p) => p.toString())],
          code: e.issues[0].code,
          message: e.issues[0].message,
        })
      }
      this.printError(e)
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
  flag(config: FlagConfig): MassargCommand<Args>
  flag(config: MassargFlag): MassargCommand<Args>
  flag(config: FlagConfig | MassargFlag): MassargCommand<Args> {
    try {
      const flag = config instanceof MassargFlag ? config : new MassargFlag(config)
      this.assertNotDuplicate(flag, 'flag')
      this.options.push(flag as MassargOption)
      return this
    } catch (e) {
      if (isZodError(e)) {
        e = new ValidationError({
          path: [this.name, config.name, ...e.issues[0].path.map((p) => p.toString())],
          code: e.issues[0].code,
          message: e.issues[0].message,
        })
      }
      this.printError(e)
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
  option<T = string, A extends ArgsObject = Args>(config: MassargOption<T, A>): MassargCommand<Args>
  option<T = string, A extends ArgsObject = Args>(
    config: TypedOptionConfig<T, A>,
  ): MassargCommand<Args>
  option<T = string, A extends ArgsObject = Args>(
    config: TypedOptionConfig<T, A> | MassargOption<T, A>,
  ): MassargCommand<Args> {
    try {
      const option =
        config instanceof MassargOption
          ? config
          : MassargOption.fromTypedConfig(config as TypedOptionConfig<T, A>)
      this.assertNotDuplicate(option, 'option')
      this.assertOnlyOneDefault<T, A>(option)
      this.options.push(option as MassargOption)
      return this
    } catch (e) {
      if (isZodError(e)) {
        e = new ValidationError({
          path: [this.name, config.name, ...e.issues[0].path.map((p) => p.toString())],
          code: e.issues[0].code,
          message: e.issues[0].message,
        })
      }
      this.printError(e)
      throw e
    }
  }

  private assertNotDuplicate<T = string, A extends ArgsObject = Args>(
    option: MassargOption<T, A>,
    type: 'option' | 'flag',
  ) {
    const existingName = this.options.find((c) => c.name === option.name)
    if (existingName) {
      throw new ValidationError({
        code: `duplicate_${type}_name`,
        message: `${capitalize(type)} name "${existingName.name}" already exists`,
        path: [this.name, option.name],
      })
    }
    const existingAlias = this.options.find((c) =>
      c.aliases.some((a) => option.aliases.includes(a)),
    )
    if (existingAlias) {
      const alias = option.aliases.find((a) => existingAlias.aliases.includes(a))!
      throw new ValidationError({
        code: 'duplicate_option_alias',
        message: `Option alias "${alias}" already exists on option "${existingAlias.name}"`,
        path: [this.name, option.name],
      })
    }
  }

  private assertOnlyOneDefault<T = string, A extends ArgsObject = Args>(
    option: MassargOption<T, A>,
  ) {
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
    let ret: MassargCommand<any> = this
    if (this.helpConfig.bindCommand) {
      ret = ret.command(new MassargHelpCommand())
    }
    if (this.helpConfig.bindOption) {
      ret = ret.option(new MassargHelpFlag())
    }
    return this as MassargCommand<Args>
  }

  /**
   * Configure the main function for this command. This command will run when no sub-commands
   * are provided.
   *
   * If none is provided, help will be printed.
   */
  main(run: Runner<Args>): MassargCommand<Args> {
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
  parse(
    argv = process.argv.slice(2),
    args?: Partial<Args>,
    parent?: MassargCommand<Args>,
  ): Promise<void> | void {
    try {
      this.getArgs(argv, args, parent, true)
    } catch (e) {
      this.printError(e)
    }
  }

  private printError(e: unknown) {
    const message = getErrorMessage(e)
    console.error(format(message, { color: 'red' }))
  }

  private parseOption(arg: string, argv: string[]) {
    const prefixes = { ...this.optionPrefixes }
    const option = this.options.find((o) => o.isMatch(arg, prefixes))
    if (!option) {
      throw new ValidationError({
        path: [MassargOption.findNameInArg(arg, prefixes)],
        code: 'unknown_option',
        message: 'Unknown option',
      })
    }
    const res = option.parseDetails([arg, ...argv], { ...this.args }, prefixes)

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
        _args[option.getOutputName() as keyof Args] = option.defaultValue as Args[keyof Args]
      }
    }

    // parse options
    while (_argv.length) {
      const arg = _argv.shift()!

      // make sure option exists
      const found = this.options.find((o) => o.isMatch(arg, this.optionPrefixes))
      if (found) {
        if (this.helpConfig.bindOption && found.name === 'help') {
          if (parseCommands) {
            this.printHelp()
            return
          }
          return this.args as Args
        }
        _argv = this.parseOption(arg, _argv)
        _args = { ..._args, ...this.args }
        continue
      }

      // if not, try see if it's a command
      const command = this.commands.find((c) => c.name === arg || c.aliases.includes(arg))
      if (command) {
        // this is dry run, just exit
        if (!parseCommands) {
          return command.getArgs(_argv, this.args, parent ?? this, false)
          // break
        }
        // this is real run, parse command, pass unparsed args
        return command.parse(_argv, this.args, parent ?? this)
      }
      // default option - passes arg value even without flag name
      const defaultOption = this.options.find((o) => o.isDefault)
      if (defaultOption) {
        this.parseOption(`--${defaultOption.name}`, [arg])
        continue
      }
      // not parsed by any step, add to extra key
      _a.extra ??= []
      _a.extra.push(arg)
    }
    // merge args
    this.args = { ...this.args, ..._args }
    this.assertRequired()
    // dry run, just exit
    if (!parseCommands) {
      return this.args as Args
    }

    // no sub command found, run main command
    if (this._run) {
      this._run(this.args as Args, parent ?? this)
    }
  }

  private assertRequired() {
    const required = this.options.filter((o) => o.isRequired)
    const missing = required.filter((o) => this.args[o.getOutputName() as keyof Args] === undefined)
    if (missing.length) {
      const plural = missing.length > 1 ? 's' : ''
      throw new ValidationError({
        code: 'missing_required_options',
        message: `Missing required option${plural}: ${missing.map((o) => o.name).join(', ')}`,
        path: [this.name],
      })
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

export class MassargHelpCommand<
  T extends { command?: string } = { command?: string },
> extends MassargCommand<T> {
  constructor(config: Partial<Omit<CommandConfig<T>, 'run'>> = {}) {
    const _config = CommandConfig(z.any()).parse({
      name: 'help',
      aliases: ['h'],
      description: 'Print help for this command, or a sub-command if specified',
      run: (args: { command?: string }, parent) => {
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
    } as CommandConfig<T>)
    super(_config)
    this.option({
      name: 'command',
      aliases: ['c'],
      description: 'Command to print help for',
      isDefault: true,
    })
  }
}
