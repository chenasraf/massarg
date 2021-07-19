import { CommandDef, ExampleDef, HelpDef, MainDef, OptionDef } from "./options"
import { asArray } from "./utils"

export function assert(condition: any, message?: string): void {
  if (!condition) {
    throw new Error(message)
  }
}

export function assertHelp(help: HelpDef) {
  assert(
    [null, undefined].includes(help.binName as any) || typeof help.binName === "string",
    "Binary Name must be string"
  )
  assert(
    [null, undefined].includes(help.normalColors as any) ||
      asArray(help.normalColors).every((c) => typeof c === "string"),
    "Normal colors must be string or list of strings"
  )
  assert(
    [null, undefined].includes(help.bodyColors as any) || asArray(help.bodyColors).every((c) => typeof c === "string"),
    "Body colors must be string or list of strings"
  )
  assert(
    [null, undefined].includes(help.titleColors as any) ||
      asArray(help.titleColors).every((c) => typeof c === "string"),
    "Title colors must be string or list of strings"
  )
  assert(
    [null, undefined].includes(help.subtitleColors as any) ||
      asArray(help.subtitleColors).every((c) => typeof c === "string"),
    "Subtitle colors must be string or list of strings"
  )
  assert(
    [null, undefined].includes(help.highlightColors as any) ||
      asArray(help.highlightColors).every((c) => typeof c === "string"),
    "Highlight colors must be string or list of strings"
  )
  assert([null, undefined].includes(help.footer as any) || typeof help.footer === "string", "Footer must be string")
  assert([null, undefined].includes(help.header as any) || typeof help.header === "string", "Header must be string")
  assert(
    [null, undefined].includes(help.optionNameSeparator as any) || typeof help.optionNameSeparator === "string",
    "Option Name Separator must be string"
  )
  assert(
    [null, undefined].includes(help.commandNameSeparator as any) || typeof help.commandNameSeparator === "string",
    "Command Name Separator must be string"
  )
  assert(
    [null, undefined].includes(help.printWidth as any) || (typeof help.printWidth === "number" && help.printWidth >= 0),
    "Print Width must be a number ≥ 0"
  )
  assert(
    [null, undefined].includes(help.exampleInputPrefix as any) || typeof help.exampleInputPrefix === "string",
    "Example Input Prefix must be string"
  )
  assert(
    [null, undefined].includes(help.exampleOutputPrefix as any) || typeof help.exampleOutputPrefix === "string",
    "Example Output Prefix must be string"
  )
  assert(
    [null, undefined].includes(help.usageExample as any) || typeof help.usageExample === "string",
    "Usage Example must be string"
  )
  assert(
    [null, undefined].includes(help.useGlobalColumns as any) || typeof help.useGlobalColumns === "boolean",
    "Usage Example must be boolean"
  )
  assert(
    [null, undefined].includes(help.includeDefaults as any) || typeof help.includeDefaults === "boolean",
    "Include Defaults must be boolean"
  )
  assert(
    [null, undefined].includes(help.useColors as any) || typeof help.useColors === "boolean",
    "Use Colors must be boolean"
  )
  assert(
    [null, undefined].includes(help.useGlobalColumns as any) || typeof help.useGlobalColumns === "boolean",
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
