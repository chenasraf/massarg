import { z } from 'zod'
import { isZodError, ParseError } from './error'
import { toCamelCase } from './utils'

export const OptionConfig = <T extends z.ZodType>(type: T) =>
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
    parse: z.function().args(z.string()).returns(type).optional(),
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
export type OptionConfig<T = unknown> = z.infer<ReturnType<typeof OptionConfig<z.ZodType<T>>>>

export const TypedOptionConfig = <T extends z.ZodType>(type: T) =>
  OptionConfig(type).merge(
    z.object({
      type: z.enum(['number']).optional(),
    }),
  )
export type TypedOptionConfig<T = unknown> = z.infer<
  ReturnType<typeof TypedOptionConfig<z.ZodType<T>>>
>

/**
 * @see OptionConfig
 * @see ArrayOptionConfig
 */
export const ArrayOptionConfig = <T extends z.ZodType>(type: T) =>
  TypedOptionConfig(z.array(type)).merge(
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
const OPT_FULL_PREFIX = '--'
const OPT_SHORT_PREFIX = '-'
const NEGATE_FULL_PREFIX = 'no-'
const NEGATE_SHORT_PREFIX = '^'

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
export class MassargOption<T = unknown> {
  name: string
  description: string
  defaultValue?: T
  aliases: string[]
  parse: (value: string) => T
  isArray: boolean
  isDefault: boolean
  outputName?: string

  constructor(options: OptionConfig<T>) {
    OptionConfig(z.any()).parse(options)
    this.name = options.name
    this.description = options.description
    this.defaultValue = options.defaultValue
    this.aliases = options.aliases
    this.parse = options.parse ?? ((x) => x as unknown as T)
    this.isArray = options.array ?? false
    this.isDefault = options.isDefault ?? false
    this.outputName = options.outputName
  }

  static fromTypedConfig<T = unknown>(config: TypedOptionConfig<T>): MassargOption<T> {
    switch (config.type) {
      case 'number':
        return new MassargNumber(config as OptionConfig<number>) as MassargOption<T>
    }
    return new MassargOption(config as OptionConfig<T>)
  }

  _parseDetails(argv: string[]): ArgvValue<T> {
    // TODO: support --option=value
    let input = ''
    try {
      if (!this._match(argv[0])) {
        throw new ParseError({
          path: [this.name],
          code: 'invalid_option',
          message: `Expected option ${this.name}`,
          received: JSON.stringify(argv[0]),
        })
      }
      argv.shift()
      input = argv.shift()!
      const value = this.parse(input)
      return { key: this.outputName || toCamelCase(this.name), value, argv }
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

  _match(arg: string): boolean {
    if (!arg) return false
    // full prefix
    if (arg.startsWith(OPT_FULL_PREFIX)) {
      // negate full prefix
      if (arg.startsWith(`--${NEGATE_FULL_PREFIX}`)) {
        return this.name === arg.slice(`--${NEGATE_FULL_PREFIX}`.length)
      }
      return this.name === arg.slice(OPT_FULL_PREFIX.length)
    }
    // short prefix
    if (arg.startsWith(OPT_SHORT_PREFIX) || arg.startsWith(NEGATE_SHORT_PREFIX)) {
      return this.aliases.includes(arg.slice(OPT_SHORT_PREFIX.length))
    }
    // negate short prefix
    if (arg.startsWith(NEGATE_SHORT_PREFIX)) {
      return this.aliases.includes(arg.slice(NEGATE_SHORT_PREFIX.length))
    }
    // no prefix
    return false
  }

  _isOption(arg: string): boolean {
    return (
      arg.startsWith(OPT_FULL_PREFIX) ||
      arg.startsWith(OPT_SHORT_PREFIX) ||
      arg.startsWith(NEGATE_SHORT_PREFIX)
    )
  }

  static getName(arg: string): string {
    if (arg.startsWith(OPT_FULL_PREFIX)) {
      // negate full prefix
      if (arg.startsWith(`--${NEGATE_FULL_PREFIX}`)) {
        return arg.slice(`--${NEGATE_FULL_PREFIX}`.length)
      }
      return arg.slice(OPT_FULL_PREFIX.length)
    }
    // short prefix
    if (arg.startsWith(OPT_SHORT_PREFIX) || arg.startsWith(NEGATE_SHORT_PREFIX)) {
      return arg.slice(OPT_SHORT_PREFIX.length)
    }
    // negate short prefix
    if (arg.startsWith(NEGATE_SHORT_PREFIX)) {
      return arg.slice(NEGATE_SHORT_PREFIX.length)
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
      parse: (value) => Number(value),
    })
  }

  _parseDetails(argv: string[]): ArgvValue<number> {
    try {
      const { argv: _argv, value } = super._parseDetails(argv)
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
 * configuration.
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
  constructor(options: Omit<OptionConfig<boolean>, 'parse'>) {
    super({
      ...options,
      parse: () => true,
    })
  }

  _parseDetails(argv: string[]): ArgvValue<boolean> {
    try {
      const isNegation =
        argv[0]?.startsWith(NEGATE_SHORT_PREFIX) || argv[0]?.startsWith(NEGATE_FULL_PREFIX)
      if (!this._match(argv[0])) {
        throw new ParseError({
          path: [this.name],
          code: 'invalid_option',
          message: `Expected option ${this.name}`,
          received: JSON.stringify(argv[0]),
        })
      }

      argv.shift()
      if (isNegation) {
        return { key: this.name, value: false, argv }
      }
      return { key: this.name, value: true, argv }
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
