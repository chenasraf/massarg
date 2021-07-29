export class RequiredError extends Error {
  fieldName!: string
  cmdName!: string

  constructor(fieldName: string, cmdName: string) {
    super(
      `Option: \`${fieldName}\` is required${
        cmdName !== "all" ? ` for command: \`${cmdName}\`` : ""
      }, but was not defined. Try using: \`--${fieldName} {value}\``
    )
    this.fieldName = fieldName
    this.cmdName = cmdName
  }
}
