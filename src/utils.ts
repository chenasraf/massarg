import z from 'zod'

/** @internal */
export function _setOrPush<T>(
  newValue: unknown,
  currentValue: T[] | T | undefined,
  isArray: boolean,
): T {
  if (isArray) {
    return [...((currentValue as unknown[]) ?? []), newValue] as T
  }
  return newValue as T
}
/** A value that can be stringified using one of the util functions. */
export type Parseable = string | number | boolean | null | undefined | Record<string, unknown>

/** A type that makes all properties of an object required, recursively. */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : NonNullable<T[P]>
}

/**
 * Concatenates strings, arrays of strings, and objects with truthy values.
 *
 * It works recursively, so adding an array of strings to an array of strings will work.
 *
 * Falsy values are ignored, so pasing `undefined` or `null` will not add anything to the result,
 * and using a boolean will only add it if it is `true`. Using 0 will also not add anything.
 */
export function strConcat(...strs: (Parseable | Parseable[])[]) {
  const res: string[] = []
  for (const str of strs) {
    if (typeof str === 'string') {
      res.push(str)
      continue
    }
    if (Array.isArray(str)) {
      res.push(strConcat(...str))
      continue
    }
    if (str == null) {
      continue
    }
    if (typeof str === 'object') {
      for (const [key, value] of Object.entries(str)) {
        if (Boolean(value)) {
          res.push(key)
        }
      }
      continue
    }
    if (Boolean(str)) {
      res.push(str.toString())
      continue
    }
  }
  return res.join('\n')
}

/**
 * Indents a string or an array of strings. Concatenates them all using `strConcat`.
 */
export function indent(str: Parseable | Parseable[], indent = 2): string {
  return strConcat(str)
    .split('\n')
    .map((s) => ' '.repeat(indent) + s)
    .join('\n')
}

/** @internal */
export function _zodEnumFromObjKeys<K extends string>(obj: Record<K, any>): z.ZodEnum<[K, ...K[]]> {
  const [firstKey, ...otherKeys] = Object.keys(obj) as K[]
  return z.enum([firstKey, ...otherKeys])
}

/** @internal */
export function _deepMerge<T1, T2>(obj1: T1, obj2: T2): NonNullable<T1> & NonNullable<T2> {
  const res = { ...obj1 } as any
  if (obj1 == null) return obj2 as any
  if (obj2 == null) return obj1 as any
  for (const [key, value] of Object.entries(obj2 as never)) {
    if (typeof value === 'object' && typeof res[key] === 'object') {
      res[key] = _deepMerge(res[key], value)
    } else {
      res[key] = value
    }
  }
  return res
}

export function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1)
}

/**
 * Splits a name into words, using camelCase, PascalCase, snake_case, and kebab-case or
 * regular spaced strings.
 */
export function splitWords(str: string): string[] {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
    .replace(/([0-9])([a-zA-Z])/g, '$1 $2')
    .replace(/([a-z])([_-])/g, '$1 $2')
    .replace(/([_-])([a-zA-Z])/g, '$1 $2')
    .split(/[_\- ]/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export function toCamelCase(str: string): string {
  return splitWords(str)
    .map((s, i) => (i === 0 ? s : s[0].toUpperCase() + s.slice(1)))
    .join('')
}

export function toPascalCase(str: string): string {
  return splitWords(str)
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join('')
}

export function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message
  }
  return String(err)
}
