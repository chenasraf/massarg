export class RequiredError extends Error {
  fieldName!: string
  cmdName!: string

  constructor(fieldName: string, cmdName: string) {
    super(`${fieldName} is required, but was not defined` + (cmdName !== "all" ? ` for ${cmdName}` : ""))
    this.fieldName = fieldName
    this.cmdName = cmdName
  }
}
