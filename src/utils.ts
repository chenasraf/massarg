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
