import capitalize from "lodash/capitalize"
import massarg from "../src"
import { colorList } from "../src/assertions"
import { HelpDef } from "../src/options"

describe("Assertions", () => {
  test("should assert main command input", () => {
    expect(() => massarg().main(undefined as any)).toThrow("Main: Main must be provided")
    expect(() => massarg().main(1 as any)).toThrow("Main: Main must be function")
  })

  test("should assert command input", () => {
    expect(() =>
      massarg().command({
        name: 1 as any,
        run: () => void 0,
      })
    ).toThrow("Command: Name must be string")

    expect(() =>
      massarg().command({
        name: undefined as any,
        run: () => void 0,
      })
    ).toThrow("Command: Name must be provided")

    expect(() =>
      massarg().command({
        name: "cmd",
        run: undefined as any,
      })
    ).toThrow("Command: Run must be provided")

    expect(() =>
      massarg().command({
        name: "cmd",
        run: 1 as any,
      })
    ).toThrow("Command: Run must be function")

    expect(() =>
      massarg()
        .command({
          name: "cmd",
          run: () => void 0,
        })
        .command({
          name: "cmd2",
          aliases: ["cmd"],
          run: () => void 0,
        })
    ).toThrow("Command: Aliases must be unique")
  })

  test("should assert option input", () => {
    expect(() =>
      massarg().option({
        name: 1 as any,
      })
    ).toThrow("Option: Name must be string")

    expect(() =>
      massarg().option({
        name: undefined as any,
      })
    ).toThrow("Option: Name must be provided")

    expect(() =>
      massarg().option({
        name: "opt",
        parse: 1 as any,
      })
    ).toThrow("Option: Parse must be function")

    expect(() =>
      massarg()
        .option({
          name: "opt",
        })
        .option({
          name: "opt2",
          aliases: ["opt"],
        })
    ).toThrow("Option: Aliases must be unique")
  })

  describe("help input assertions", () => {
    const strings: Partial<Record<keyof HelpDef, string>> = {
      binName: "Binary Name",
      optionNameSeparator: "Option Name Separator",
      commandNameSeparator: "Command Name Separator",
      header: "Header",
      footer: "Footer",
      exampleInputPrefix: "Example Input Prefix",
      exampleOutputPrefix: "Example Output Prefix",
      usageExample: "Usage Example",
    }

    const bools: Partial<Record<keyof HelpDef, string>> = {
      includeDefaults: "Include Defaults",
      useColors: "Use Colors",
      useGlobalColumns: "Use Global Columns",
    }

    for (const k of Object.getOwnPropertyNames(strings)) {
      test(`should assert string ${k}`, () => {
        expect(() => massarg().help({ [k as keyof HelpDef]: 1 as any })).toThrow(
          `Help: ${strings[k as keyof HelpDef]} must be string`
        )
      })
    }

    for (const k of Object.getOwnPropertyNames(bools)) {
      test(`should assert bool ${k}`, () => {
        expect(() => massarg().help({ [k as keyof HelpDef]: 1 as any })).toThrow(
          `Help: ${bools[k as keyof HelpDef]} must be bool`
        )
      })
    }

    test("should assert other help input params", () => {
      const colors = ["normal", "body", "title", "subtitle", "highlight"]
      for (const color of colors) {
        expect(() =>
          massarg().help({
            [color + "Colors"]: [1],
          })
        ).toThrow(
          `Help: ${capitalize(color)} colors must be string or array of strings. Accepted values: ` +
            colorList.join(", ")
        )
      }

      expect(() => massarg().help({ printWidth: -1 })).toThrow("Help: Print Width must be ≥ 0")
      expect(() => massarg().help({ printWidth: "a" as any })).toThrow("Help: Print Width must be number")
    })
  })
})
