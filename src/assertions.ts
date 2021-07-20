import chalk from "chalk"
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

export const colorList = [
  "reset",
  "bold",
  "dim",
  "italic",
  "underline",
  "inverse",
  "hidden",
  "strikethrough",
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "gray",
  "bgBlack",
  "bgRed",
  "bgGreen",
  "bgYellow",
  "bgBlue",
  "bgMagenta",
  "bgCyan",
  "bgWhite",
]

export function assertHelp(help: HelpDef) {
  assert(nullOr(help.binName, typeof help.binName === "string"), "Help: Binary Name must be string")
  assert(
    nullOr(
      help.normalColors,
      asArray(help.normalColors).every((c) => colorList.includes(c!))
    ),
    "Help: Normal colors must be string or array of strings. Accepted values: " + colorList.join(", ")
  )
  assert(
    nullOr(
      help.bodyColors,
      asArray(help.bodyColors).every((c) => colorList.includes(c!))
    ),
    "Help: Body colors must be string or array of strings. Accepted values: " + colorList.join(", ")
  )
  assert(
    nullOr(
      help.titleColors,
      asArray(help.titleColors).every((c) => colorList.includes(c!))
    ),
    "Help: Title colors must be string or array of strings. Accepted values: " + colorList.join(", ")
  )
  assert(
    nullOr(
      help.subtitleColors,
      asArray(help.subtitleColors).every((c) => colorList.includes(c!))
    ),
    "Help: Subtitle colors must be string or array of strings. Accepted values: " + colorList.join(", ")
  )
  assert(
    nullOr(
      help.highlightColors,
      asArray(help.highlightColors).every((c) => colorList.includes(c!))
    ),
    "Help: Highlight colors must be string or array of strings. Accepted values: " + colorList.join(", ")
  )
  assert(nullOr(help.footer, typeof help.footer === "string"), "Help: Footer must be string")
  assert(nullOr(help.header, typeof help.header === "string"), "Help: Header must be string")
  assert(
    nullOr(help.optionNameSeparator, typeof help.optionNameSeparator === "string"),
    "Help: Option Name Separator must be string"
  )
  assert(
    nullOr(help.commandNameSeparator, typeof help.commandNameSeparator === "string"),
    "Help: Command Name Separator must be string"
  )
  assert(
    nullOr(help.printWidth, typeof help.printWidth === "number" && help.printWidth >= 0),
    "Help: Print Width must be a number ≥ 0"
  )
  assert(
    nullOr(help.exampleInputPrefix, typeof help.exampleInputPrefix === "string"),
    "Help: Example Input Prefix must be string"
  )
  assert(
    nullOr(help.exampleOutputPrefix, typeof help.exampleOutputPrefix === "string"),
    "Help: Example Output Prefix must be string"
  )
  assert(nullOr(help.usageExample, typeof help.usageExample === "string"), "Help: Usage Example must be string")
  assert(
    nullOr(help.useGlobalColumns, typeof help.useGlobalColumns === "boolean"),
    "Help: Use Global Columns must be boolean"
  )
  assert(
    nullOr(help.includeDefaults, typeof help.includeDefaults === "boolean"),
    "Help: Include Defaults must be boolean"
  )
  assert(nullOr(help.useColors, typeof help.useColors === "boolean"), "Help: Use Colors must be boolean")
}

export function assertCommand(command: CommandDef<any>, allCommands: CommandDef<any>[]): void {
  assert(command.name, "Command: Name must be provided")
  assert(typeof command.name === "string", "Command: Name must be string")
  assert(
    !command.aliases ||
      command.aliases.every((a) => !allCommands.find((cmd) => cmd.name === a || cmd.aliases?.includes(a))),
    "Command: Aliases must be unique"
  )
  assert(command.run, "Command: Run function must be provided")
  assert(typeof command.run === "function", "Command: Run must be a function")
}

export function assertOption(option: OptionDef<any, any>, allOptions: OptionDef<any, any>[]): void {
  assert(option.name, "Option: Name must be provided")
  assert(typeof option.name === "string", "Option: Name must be string")

  assert(
    nullOr(
      option.aliases,
      option.aliases?.every((a) => typeof a === "string")
    ),
    "Option: Aliases must an array of strings"
  )
  assert(
    nullOr(
      option.aliases,
      option.aliases?.every((a) => !allOptions.find((opt) => opt.name === a || opt.aliases?.includes(a)))
    ),
    "Option: Aliases must be unique"
  )
  assert(nullOr(option.boolean, typeof ["undefined", "boolean"].includes(typeof option.defaultValue)))

  assert(typeof option.parse === "function", "Option: Parse must be a function")
}

export function assertExample(example: ExampleDef) {
  assert(example.input, "Example: Input must be provided")
  assert(typeof example.output === "string", 'Example: Output must be provided. To signify empty output, use ""')
}

export function assertMain(run: MainDef<any>) {
  assert(run, "Main: Main function must be provided")
  assert(typeof run === "function", "Main: Main must be a function")
}
