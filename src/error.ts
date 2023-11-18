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

  constructor({ path, code, message }: { path: string[]; code: string; message: string }) {
    const msg = `${path.join(".")}: ${message}`
    super(msg)
    this.path = path
    this.code = code
    this.message = msg
    this.name = "ParseError"
  }
}
