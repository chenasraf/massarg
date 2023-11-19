import { z } from "zod"

export class ValidationError extends Error {
  path: string[]
  code: string
  message: string

  constructor({ path, code, message }: { path: string[]; code: string; message: string }) {
    const msg = `${path.join(".")}: ${message}`
    super(msg)
    this.path = path
    this.code = code
    this.message = msg
    this.name = "ValidationError"
  }
}
export class ParseError extends Error {
  path: string[]
  code: string
  message: string
  received: unknown

  constructor({
    path,
    code,
    message,
    received,
  }: {
    path: string[]
    code: string
    message: string
    received?: unknown
  }) {
    let msg = `${path.join(".")}: ${message}`
    if (received) {
      msg += ` (received: ${received})`
    }
    super(msg)
    this.path = path
    this.code = code
    this.message = msg
    this.name = "ParseError"
    this.received = received
  }
}

export function isZodError(e: unknown): e is z.ZodError {
  return e instanceof z.ZodError
}
