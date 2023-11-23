import z from 'zod'

export function setOrPush<T>(
  newValue: unknown,
  currentValue: T[] | T | undefined,
  isArray: boolean,
): T {
  if (isArray) {
    return [...((currentValue as unknown[]) ?? []), newValue] as T
  }
  return newValue as T
}
type Parseable = string | number | boolean | null | undefined | Record<string, unknown>

export function chainStr(...strs: (Parseable | Parseable[])[]) {
  const res: string[] = []
  for (const str of strs) {
    if (typeof str === 'string') {
      res.push(str)
      continue
    }
    if (Array.isArray(str)) {
      res.push(chainStr(...str))
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

export function indent(str: Parseable | Parseable[], indent = 2): string {
  return chainStr(str)
    .split('\n')
    .map((s) => ' '.repeat(indent) + s)
    .join('\n')
}

export function zodEnumFromObjKeys<K extends string>(obj: Record<K, any>): z.ZodEnum<[K, ...K[]]> {
  const [firstKey, ...otherKeys] = Object.keys(obj) as K[]
  return z.enum([firstKey, ...otherKeys])
}

export function deepMerge<T1, T2>(obj1: T1, obj2: T2): NonNullable<T1> & NonNullable<T2> {
  const res = { ...obj1 } as any
  if (obj1 == null) return obj2 as any
  if (obj2 == null) return obj1 as any
  for (const [key, value] of Object.entries(obj2 as never)) {
    if (typeof value === 'object' && typeof res[key] === 'object') {
      res[key] = deepMerge(res[key], value)
    } else {
      res[key] = value
    }
  }
  return res
}
