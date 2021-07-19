import { CommandDef, ExampleDef, HelpDef, MainDef, OptionDef } from "./options"
import { asArray } from "./utils"

export function assert(condition: any, message?: string): void {
  if (!condition) {
    throw new Error(message)
  }
}

function nullOr(condition: any, condition2: any): boolean {
  return [null, undefined].includes(condition) || condition2
}

export function assertHelp(help: HelpDef) {
  assert(nullOr(help.binName, typeof help.binName === "string"), "Binary Name must be string")
  assert(
    nullOr(
      help.normalColors,
      asArray(help.normalColors).every((c) => typeof c === "string")
    ),
    "Normal colors must be string or list of strings"
  )
  assert(
    nullOr(
      help.bodyColors,
      asArray(help.bodyColors).every((c) => typeof c === "string")
    ),
    "Body colors must be string or list of strings"
  )
  assert(
    nullOr(
      help.titleColors,
      asArray(help.titleColors).every((c) => typeof c === "string")
    ),
    "Title colors must be string or list of strings"
  )
  assert(
    nullOr(
      help.subtitleColors,
      asArray(help.subtitleColors).every((c) => typeof c === "string")
    ),
    "Subtitle colors must be string or list of strings"
  )
  assert(
    nullOr(
      help.highlightColors,
      asArray(help.highlightColors).every((c) => typeof c === "string")
    ),
    "Highlight colors must be string or list of strings"
  )
  assert(nullOr(help.footer, typeof help.footer === "string"), "Footer must be string")
  assert(nullOr(help.header, typeof help.header === "string"), "Header must be string")
  assert(
    nullOr(help.optionNameSeparator, typeof help.optionNameSeparator === "string"),
    "Option Name Separator must be string"
  )
  assert(
    nullOr(help.commandNameSeparator, typeof help.commandNameSeparator === "string"),
    "Command Name Separator must be string"
  )
  assert(
    nullOr(help.printWidth, typeof help.printWidth === "number" && help.printWidth >= 0),
    "Print Width must be a number ≥ 0"
  )
  assert(
    nullOr(help.exampleInputPrefix, typeof help.exampleInputPrefix === "string"),
    "Example Input Prefix must be string"
  )
  assert(
    nullOr(help.exampleOutputPrefix, typeof help.exampleOutputPrefix === "string"),
    "Example Output Prefix must be string"
  )
  assert(nullOr(help.usageExample, typeof help.usageExample === "string"), "Usage Example must be string")
  assert(nullOr(help.useGlobalColumns, typeof help.useGlobalColumns === "boolean"), "Usage Example must be boolean")
  assert(nullOr(help.includeDefaults, typeof help.includeDefaults === "boolean"), "Include Defaults must be boolean")
  assert(nullOr(help.useColors, typeof help.useColors === "boolean"), "Use Colors must be boolean")
  assert(
    nullOr(help.useGlobalColumns, typeof help.useGlobalColumns === "boolean"),
    "Use Global Columns must be boolean"
  )
}

export function assertCommand(command: CommandDef<any>, allCommands: CommandDef<any>[]): void {
  assert(command.name, "Name must be provided")
  assert(command.name, "Name must be provided")
  assert(
    !command.aliases ||
      command.aliases.every((a) => !allCommands.find((cmd) => cmd.name === a || cmd.aliases?.includes(a))),
    "Aliases must be unique"
  )
  assert(command.run, "Run function must be provided")
}

export function assertOption(option: OptionDef<any, any>, allOptions: OptionDef<any, any>[]): void {
  assert(option.name, "Option name can not be empty")
  assert(!option.aliases || option.aliases.every((a) => typeof a === "string"), "Aliases must an array of strings")
  assert(
    !option.aliases ||
      option.aliases.every((a) => !allOptions.find((opt) => opt.name === a || opt.aliases?.includes(a))),
    "Aliases must be unique"
  )
  assert(!option.boolean || typeof ["undefined", "boolean"].includes(typeof option.defaultValue))
}

export function assertExample(example: ExampleDef) {
  assert(example.input, "Input must be provided")
  assert(!example.output || example.output === "", 'Output must be provided. To signify empty output, use ""')
}

export function assertMain(run: MainDef<any>) {
  assert(run, "Main function must be provided")
}
