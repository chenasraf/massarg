import { z } from 'zod'

/** This error is thrown when a validation fails. */
export class ValidationError extends Error {
  /** The path to the value that failed validation. */
  path: string[]
  /** The error code. */
  code: string
  /** The error message. */
  message: string

  constructor({ path, code, message }: { path: string[]; code: string; message: string }) {
    const msg = `${path.join('.')}: ${message}`
    super(msg)
    this.path = path
    this.code = code
    this.message = msg
    this.name = 'ValidationError'
  }
}

/** This error is thrown when a parse fails on an option value. */
export class ParseError extends Error {
  /** The path to the value that failed parsing. */
  path: string[]
  /** The error code. */
  code: string
  /** The error message. */
  message: string
  /** The value that failed parsing. */
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
    let msg = `${path.join('.')}: ${message}`
    if (received) {
      msg += ` (received: ${received})`
    }
    super(msg)
    this.path = path
    this.code = code
    this.message = msg
    this.name = 'ParseError'
    this.received = received
  }
}

export function isZodError(e: unknown): e is z.ZodError {
  return e instanceof z.ZodError
}
