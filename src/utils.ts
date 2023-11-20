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
