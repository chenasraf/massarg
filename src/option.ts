import { z } from "zod"
import { ParseError } from "./error"
import { isZodError } from "./utils"

export const OptionConfig = <T extends z.ZodType>(type: T) =>
  z.object({
    name: z.string(),
    description: z.string(),
    defaultValue: z.any().optional(),
    aliases: z.string().array(),
    parse: z.function().args(z.string()).returns(type).optional(),
  })
export type OptionConfig<T = unknown> = z.infer<ReturnType<typeof OptionConfig<z.ZodType<T>>>>

export type OptionType = "string" | "number" | "boolean"

export default class MassargOption<T = unknown> {
  name: string
  description: string
  defaultValue?: T
  aliases: string[]
  parse: (value: string) => T

  constructor(options: OptionConfig<T>) {
    OptionConfig(z.any()).parse(options)
    this.name = options.name
    this.description = options.description
    this.defaultValue = options.defaultValue
    this.aliases = options.aliases
    this.parse = options.parse ?? ((x) => x as unknown as T)
  }

  valueFromArgv(argv: string[]): { argv: string[]; value: T; key: string } {
    // TODO: support --option=value
    argv.shift()
    try {
      const value = this.parse(argv.shift()!)
      return { key: this.name, value, argv }
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

export class MassargNumber extends MassargOption<number> {
  constructor(options: Omit<OptionConfig<number>, "parse">) {
    super({
      ...options,
      parse: (value) => Number(value),
    })
  }

  valueFromArgv(argv: string[]): { argv: string[]; value: number; key: string } {
    try {
      const { argv: _argv, value } = super.valueFromArgv(argv)
      if (isNaN(value)) {
        throw new ParseError({
          path: [this.name],
          code: "invalid_type",
          message: "Expected a number",
        })
      }
      return { key: this.name, value, argv: _argv }
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

export class MassargFlag extends MassargOption<boolean> {
  constructor(options: Omit<OptionConfig<boolean>, "parse">) {
    super({
      ...options,
      parse: () => true,
    })
  }

  valueFromArgv(argv: string[]): { argv: string[]; value: boolean; key: string } {
    try {
      const isNegation = argv[0]?.startsWith("-!")
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

export { MassargOption }
