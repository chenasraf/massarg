import { z } from 'zod'
import { isZodError, ParseError } from './error'

export const OptionConfig = <T extends z.ZodType>(type: T) =>
  z.object({
    name: z.string(),
    description: z.string(),
    defaultValue: z.any().optional(),
    aliases: z.string().array(),
    parse: z.function().args(z.string()).returns(type).optional(),
    array: z.boolean().optional(),
    required: z.boolean().optional(),
    isDefault: z.boolean().optional(),
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

export const ArrayOptionConfig = <T extends z.ZodType>(type: T) =>
  TypedOptionConfig(z.array(type)).merge(
    z.object({
      defaultValue: z.array(type).optional(),
    }),
  )
export type ArrayOptionConfig<T = unknown> = z.infer<
  ReturnType<typeof ArrayOptionConfig<z.ZodType<T>>>
>

// TODO turn to options
const OPT_FULL_PREFIX = '--'
const OPT_SHORT_PREFIX = '-'
const NEGATE_FULL_PREFIX = 'no-'
const NEGATE_SHORT_PREFIX = '^'

export type ArgvValue<T> = { argv: string[]; value: T; key: string }

export default class MassargOption<T = unknown> {
  name: string
  description: string
  defaultValue?: T
  aliases: string[]
  parse: (value: string) => T
  isArray: boolean
  isDefault: boolean

  constructor(options: OptionConfig<T>) {
    OptionConfig(z.any()).parse(options)
    this.name = options.name
    this.description = options.description
    this.defaultValue = options.defaultValue
    this.aliases = options.aliases
    this.parse = options.parse ?? ((x) => x as unknown as T)
    this.isArray = options.array ?? false
    this.isDefault = options.isDefault ?? false
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
      return { key: this.name, value, argv }
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

export { MassargOption }
