import { z } from "zod"

export function isZodError(e: unknown): e is z.ZodError {
  return e instanceof z.ZodError
}
