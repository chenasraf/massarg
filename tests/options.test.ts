import chalk from "chalk"
import massarg from "../src"
import { OptionDef } from "../src/options"
describe("Options", () => {
  test("should parse properly", () => {
    const options = massarg()
      .option({
        name: "number",
        parse: (v) => parseInt(v),
      })
      .parse(["--number", "10"])
    expect(options).toHaveProperty("number", 10)
  })

  test("should parse bool in correct forms", () => {
    const opts = {
      name: "bool",
      boolean: true,
    } as OptionDef<any, any>
    const noArg = massarg().option(opts).parse(["--bool"])
    expect(noArg).toHaveProperty("bool", true)

    const truthyNumArg = massarg().option(opts).parse(["--bool", "1"])
    expect(truthyNumArg).toHaveProperty("bool", true)

    const falsyNumArg = massarg().option(opts).parse(["--bool", "0"])
    expect(falsyNumArg).toHaveProperty("bool", false)
  })

  test("should expect value when not bool", () => {
    const opts = {
      name: "number",
      parse: (v) => parseInt(v),
    } as OptionDef<any, any>
    expect(() => massarg().option(opts).parse(["--number"])).toThrow("Missing value for: number")
  })

  test("should parse array in correct forms", () => {
    const opts = {
      name: "array",
      array: true,
    } as OptionDef<any, any>

    const arr0el = massarg().option(opts).parse([])
    expect(arr0el).toHaveProperty("array", [])

    const arr1el = massarg().option(opts).parse(["--array", "something"])
    expect(arr1el).toHaveProperty("array", ["something"])

    const arr2el = massarg().option(opts).parse(["--array", "something", "--array", "another"])
    expect(arr2el).toHaveProperty("array", ["something", "another"])
  })

  test("should print help properly", () => {
    const helpStr = massarg()
      .help({ useColors: false })
      .option({
        name: "number",
        description: "Number value",
        parse: (v) => parseInt(v),
      })
      .getHelpString()
      .join("\n")

    expect(helpStr).toBe(
      "Usage: processChild.js [command] [options]" +
        "\n\n" +
        "Options:" +
        "\n" +
        "  --help|-h                      Display help information" +
        "\n" +
        "  --number                       Number value"
    )
  })
})
