import { z } from 'zod'
import { isZodError, ParseError } from './error'
import { toCamelCase } from './utils'
import { ArgsObject } from './command'

export const OptionConfig = <OptionType, Args extends ArgsObject = ArgsObject>(
  type: z.ZodType<OptionType>,
) =>
  z.object({
    /** Name of the option */
    name: z.string(),
    /** Description of the option, displayed in the help output */
    description: z.string(),
    /** Default value of the option */
    defaultValue: z.any().optional(),
    /** Aliases for the option, which can be used with the shorthand option notation. */
    aliases: z.string().array(),
    /**
     * Parse the value of the option. You can return any type here, or throw an error if the value
     * is invalid.
     */
    parse: z.function().args(z.string(), z.any()).returns(type).optional() as z.ZodOptional<
      z.ZodType<Parser<Args, OptionType>>
    >,
    /**
     * Whether the option is an array.
     *
     * Array options can be specified multiple times, and the values will be collected into an array.
     *
     * Normally, specifying an option multiple times will override the previous value.
     */
    array: z.boolean().optional(),
    /** Whether the option is required. If it is required, parsing will throw an error if it's not
     * present.
     */
    required: z.boolean().optional(),
    /** Whether the option is the default option. The default option is the option that is used if
     * no other option is specified, e.g. a value is passed in without an option name.
     *
     * Note that if commands match the same argument first, they will be used instead of the default
     * option.
     */
    isDefault: z.boolean().optional(),
    /** Whether the option is hidden. Hidden options are not displayed in the help output. */
    hidden: z.boolean().optional(),
    /** Specify a custom name for the output, which will be used when parsing the args. */
    outputName: z.string().optional(),
  })
export type OptionConfig<T = unknown, Args extends ArgsObject = ArgsObject> = z.infer<
  ReturnType<typeof OptionConfig<T, Args>>
>

export const FlagConfig = OptionConfig<boolean>(z.any())
  .omit({ parse: true, isDefault: true })
  .merge(
    z.object({
      /** Whether the flag can be negated, e.g. `--no-verbose` */
      negatable: z.boolean().optional(),
    }),
  )
export type FlagConfig = z.infer<typeof FlagConfig>

export type Parser<Args extends ArgsObject = ArgsObject, OptionType extends any = any> = (
  x: string,
  y: Args,
) => OptionType

export const TypedOptionConfig = <OptionType, Args extends ArgsObject = ArgsObject>(
  type: z.ZodType<OptionType>,
) =>
  OptionConfig<OptionType, Args>(type).merge(
    z.object({
      type: z.enum(['number']).optional(),
    }),
  )
export type TypedOptionConfig<T, A extends ArgsObject = ArgsObject> = z.infer<
  ReturnType<typeof TypedOptionConfig<T, A>>
>

/**
 * @see OptionConfig
 * @see ArrayOptionConfig
 */
export const ArrayOptionConfig = <T, A extends ArgsObject = ArgsObject>(type: z.ZodType<T>) =>
  TypedOptionConfig<T[], A>(z.array(type)).merge(
    // OptionConfig(z.array(type)).merge(
    z.object({
      defaultValue: z.array(type).optional(),
    }),
  )

/**
 * An option that can be passed to a command.
 *
 * This type represents an array option, which can be specified multiple times.
 */
export type ArrayOptionConfig<T = unknown> = z.infer<
  ReturnType<typeof ArrayOptionConfig<z.ZodType<T>>>
>

// TODO turn to options
export const OPT_FULL_PREFIX = '--'
export const OPT_SHORT_PREFIX = '-'
export const NEGATE_FULL_PREFIX = '--no-'
export const NEGATE_SHORT_PREFIX = '^'

export type Prefixes = {
  optionPrefix: string
  aliasPrefix: string
  negateFlagPrefix: string
  negateAliasPrefix: string
}

/** @internal */
export type ArgvValue<T> = { argv: string[]; value: T; key: string }

/**
 * An option that can be passed to a command.
 *
 * Options can be specified in two ways:
 *
 * - Using the long form, e.g. `--option value`
 * - Using the short form, e.g. `-o value`
 *
 * They can also have a parse function, which will be used to parse the value passed in from the
 * original argument (string).
 *
 * @example
 * ```ts
 * massarg(options).option({
 *   name: 'option',
 *   description: 'An option',
 *   defaultValue: 'default',
 *   aliases: ['o'],
 *   parse: (value) => value.toUpperCase(),
 * })
 * ```
 */
export class MassargOption<OptionType extends any = unknown, Args extends ArgsObject = ArgsObject>
  implements OptionConfig<OptionType, Args>
{
  name: string
  description: string
  defaultValue?: OptionType
  aliases: string[]
  parse: Parser<Args, OptionType>
  isArray: boolean
  isRequired: boolean
  isDefault: boolean
  outputName?: string

  constructor(options: OptionConfig<OptionType, Args>) {
    OptionConfig(z.any()).parse(options)
    this.name = options.name
    this.description = options.description
    this.defaultValue = options.defaultValue
    this.aliases = options.aliases
    this.parse = options.parse ?? ((x: string) => x as OptionType)
    this.isArray = options.array ?? false
    this.isDefault = options.isDefault ?? false
    this.isRequired = options.required ?? false
    this.outputName = options.outputName
  }

  static fromTypedConfig<T = unknown, A extends ArgsObject = ArgsObject>(
    config: TypedOptionConfig<T, A>,
  ): MassargOption<T> {
    switch (config.type) {
      case 'number':
        return new MassargNumber(config as OptionConfig<number>) as MassargOption<any>
    }
    return new MassargOption(config as OptionConfig<T>)
  }

  getOutputName(): string {
    return this.outputName || toCamelCase(this.name)
  }

  parseDetails(argv: string[], options: ArgsObject, prefixes: Prefixes): ArgvValue<OptionType> {
    let input = ''
    try {
      if (!this.isMatch(argv[0], prefixes)) {
        throw new ParseError({
          path: [this.name],
          code: 'invalid_option',
          message: `Expected option ${this.name}`,
          received: JSON.stringify(argv[0]),
        })
      }
      argv.shift()
      input = argv.shift()!
      const value = this.parse(input, options as Args)
      return { key: this.getOutputName(), value, argv }
    } catch (e) {
      if (isZodError(e)) {
        throw new ParseError({
          path: [this.name, ...e.issues[0].path.map((p) => p.toString())],
          code: e.issues[0].code,
          message: e.issues[0].message,
          received: JSON.stringify(input),
        })
      }
      throw e
    }
  }

  helpString(): string {
    const aliases = this.aliases.length ? `|${this.aliases.join('|-')}` : ''
    return `--${this.name}${aliases} ${this.description}`
  }

  /** Returns true if the flag (including any prefixes) matches the name or aliases */
  isMatch(arg: string, prefixes: Prefixes): boolean {
    const name = MassargOption.findNameInArg(arg, prefixes)
    return name === this.name || this.aliases.includes(name)
  }

  /**
   * Returns the name of the flag, removing any prefixes. It is discriminate of if the option
   * exists, as it is a static method; it only returns the name of the flag if it matches the
   * prefixes format.
   */
  static findNameInArg(arg: string, prefixes: Prefixes): string {
    const { optionPrefix, aliasPrefix, negateFlagPrefix, negateAliasPrefix } = prefixes
    // negate full prefix
    if (arg.startsWith(negateFlagPrefix)) {
      return arg.slice(negateFlagPrefix.length)
    }
    if (arg.startsWith(optionPrefix)) {
      return arg.slice(optionPrefix.length)
    }
    // negate short prefix
    if (arg.startsWith(negateAliasPrefix)) {
      return arg.slice(negateAliasPrefix.length)
    }
    // short prefix
    if (arg.startsWith(aliasPrefix) || arg.startsWith(negateAliasPrefix)) {
      return arg.slice(aliasPrefix.length)
    }
    return '<blank>'
  }
}

/**
 * An option that can be passed to a command.
 *
 * This type of option parses a number, and fails if it is not a valid number.
 *
 * @example
 * ```ts
 * massarg(options).option({
 *   name: 'number',
 *   description: 'A number',
 *   defaultValue: 0,
 *   aliases: ['n'],
 *   type: 'number',
 * })
 * ```
 */
export class MassargNumber extends MassargOption<number> {
  constructor(options: Omit<OptionConfig<number>, 'parse'>) {
    super({
      ...options,
      parse: (value) => Number(value) as any,
    })
  }

  parseDetails(argv: string[], options: ArgsObject, prefixes: Prefixes): ArgvValue<number> {
    try {
      const { argv: _argv, value } = super.parseDetails(argv, options, prefixes)
      if (isNaN(value)) {
        throw new ParseError({
          path: [this.name],
          code: 'invalid_type',
          message: 'Expected a number',
          received: JSON.stringify(argv[0]),
        })
      }
      return { key: this.name, value, argv: _argv }
    } catch (e) {
      if (isZodError(e)) {
        throw new ParseError({
          path: [this.name, ...e.issues[0].path.map((p) => p.toString())],
          code: e.issues[0].code,
          message: e.issues[0].message,
          received: JSON.stringify(argv[0]),
        })
      }
      throw e
    }
  }
}

/**
 * An option that can be passed to a command.
 *
 * A flag is an option that is either present or not. It can be used to toggle
 * a boolean value, or to indicate that a command should be run in a different
 * mode.
 *
 * A flag can be negated by prefixing it with `no-`. For example, `--no-verbose`,
 * or by prefixing the alias with `^` instead of `-`. This is configurable via the command's
 * configuration. To turn this behavior on, set `negatable: true` in the flag's configuration.
 *
 * @example
 * ```ts
 * massarg.flag({
 *   name: 'verbose',
 *   aliases: ['v'],
 *   description: 'Enable verbose logging',
 *   defaultValue: false,
 * })
 * ```
 */
export class MassargFlag extends MassargOption<boolean> {
  negatable: boolean

  constructor(options: FlagConfig) {
    super({
      ...options,
      parse: () => true as any,
    })
    this.negatable = options.negatable ?? false
  }

  parseDetails(argv: string[], _options: ArgsObject, prefixes: Prefixes): ArgvValue<boolean> {
    try {
      const isNegation =
        argv[0]?.startsWith(prefixes.negateAliasPrefix) ||
        argv[0]?.startsWith(prefixes.negateFlagPrefix)
      if (!this.negatable && isNegation) {
        throw new ParseError({
          path: [this.name],
          code: 'invalid_option',
          message: `Option ${this.name} cannot be negated`,
          received: JSON.stringify(argv[0]),
        })
      }
      if (!this.isMatch(argv[0], prefixes)) {
        throw new ParseError({
          path: [this.name],
          code: 'invalid_option',
          message: `Expected option ${this.name}`,
          received: JSON.stringify(argv[0]),
        })
      }

      argv.shift()
      if (isNegation) {
        return { key: this.getOutputName(), value: false, argv }
      }
      return { key: this.getOutputName(), value: true, argv }
    } catch (e) {
      if (isZodError(e)) {
        throw new ParseError({
          path: [this.name, ...e.issues[0].path.map((p) => p.toString())],
          code: e.issues[0].code,
          message: e.issues[0].message,
        })
      }
      throw e
    }
  }
}

export class MassargHelpFlag extends MassargFlag {
  constructor(config: Partial<Omit<OptionConfig<boolean>, 'parse'>> = {}) {
    super({
      name: 'help',
      description: 'Show this help message',
      aliases: ['h'],
      ...config,
    })
  }
}
