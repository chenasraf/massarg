import { CommandDef, ExampleDef, HelpDef, MainDef, Named, OptionDef } from "./types"
import { ArrayOr, asArray } from "./utils"

// prettier-ignore
export const colorList = [
  "reset", "bold", "dim", "italic", "underline", "inverse", "hidden", "strikethrough", "black", "red", "green",
  "yellow", "blue", "magenta", "cyan", "white", "gray", "bgBlack", "bgRed", "bgGreen", "bgYellow", "bgBlue",
  "bgMagenta", "bgCyan", "bgWhite",
]

class AssertionError extends Error {}

function assert(condition: any, message?: string): void {
  if (!condition) {
    throw new AssertionError(message)
  }
}

function nullOr(condition: any, condition2: any): boolean {
  return [null, undefined].includes(condition) || condition2
}

function assertRequired(obj: any, prefix: string, name: string): void {
  assert(![undefined, null].includes(obj), `${prefix}: ${name} must be provided`)
}

function assertType(obj: any, prefix: string, name: string, options: { type: string; required?: boolean }): void {
  if (options.required) {
    assertRequired(obj, prefix, name)
  } else {
    try {
      assertRequired(obj, prefix, name)
    } catch (e) {
      return
    }
  }

  assert(typeof obj === options.type, `${prefix}: ${name} must be ${options.type}`)
}

function assertNumber(
  obj: number | null | undefined,
  prefix: string,
  name: string,
  options: { min?: number; max?: number; required?: boolean }
): void {
  assertType(obj, prefix, name, { required: options.required, type: "number" })

  if (!options.required && [null, undefined].includes(obj as any)) {
    return
  }

  if (typeof options.max === "number") {
    assert(obj! <= options.max, `${prefix}: ${name} must be ≤ ${options.max}`)
  }
  if (typeof options.min === "number") {
    assert(obj! >= options.min, `${prefix}: ${name} must be ≥ ${options.min}`)
  }
}

function assertColor(color: ArrayOr<string> | undefined, prefix: string, name: string) {
  assert(
    nullOr(
      color,
      asArray(color).every((c) => colorList.includes(c!))
    ),
    `${prefix}: ${name} must be string or array of strings. Accepted values: ` + colorList.join(", ")
  )
}

function assertAliases(def: Named, allDefs: Named[], prefix: string) {
  assert(
    !def.aliases || def.aliases.every((a) => !allDefs.find((opt) => [opt.name, ...(opt.aliases ?? [])].includes(a))),
    `${prefix}: Aliases must be unique`
  )
}

export function assertHelp(help: HelpDef) {
  assertType(help.binName, "Help", "Binary Name", { type: "string" })
  assertColor(help.normalColors, "Help", "Normal colors")
  assertColor(help.bodyColors, "Help", "Body colors")
  assertColor(help.titleColors, "Help", "Title colors")
  assertColor(help.subtitleColors, "Help", "Subtitle colors")
  assertColor(help.highlightColors, "Help", "Highlight colors")
  assertType(help.footer, "Help", "Footer", { type: "string" })
  assertType(help.header, "Help", "Header", { type: "string" })
  assertType(help.optionNameSeparator, "Help", "Option Name Separator", { type: "string" })
  assertType(help.commandNameSeparator, "Help", "Command Name Separator", { type: "string" })
  assertNumber(help.printWidth, "Help", "Print Width", { min: 0 })
  assertType(help.exampleInputPrefix, "Help", "Example Input Prefix", { type: "string" })
  assertType(help.exampleOutputPrefix, "Help", "Example Output Prefix", { type: "string" })
  assertType(help.usageExample, "Help", "Usage Example", { type: "string" })
  assertType(help.useGlobalColumns, "Help", "Use Global Columns", { type: "boolean" })
  assertType(help.includeDefaults, "Help", "Include Defaults", { type: "boolean" })
  assertType(help.useColors, "Help", "Use Colors", { type: "boolean" })
}

export function assertCommand(command: CommandDef<any>, allCommands: CommandDef<any>[]): void {
  assertType(command.name, "Command", "Name", { required: true, type: "string" })
  assertAliases(command, allCommands, "Command")
  assertType(command.run, "Command", "Run", { required: true, type: "function" })
}

export function assertOption(option: OptionDef<any, any>, allOptions: OptionDef<any, any>[]): void {
  assert(option.name, "Option: Name must be provided")
  assert(typeof option.name === "string", "Option: Name must be string")
  assertAliases(option, allOptions, "Option")
  assertType(option.boolean, "Option", "Default Value", { type: "boolean" })
  assertType(option.parse, "Option", "Parse", { type: "function" })
}

export function assertExample(example: ExampleDef) {
  assertType(example.input, "Example", "Input", { required: true, type: "string" })
  assertType(example.output, "Example", "Output", { type: "string" })
  assertType(example.description, "Example", "Description", { type: "string" })
}

export function assertMain(run: MainDef<any>) {
  assertType(run, "Main", "Main", { required: true, type: "function" })
}
