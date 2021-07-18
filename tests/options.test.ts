import massarg from "../src"
import { OptionDef } from "../src/options"

describe("Options", () => {
  test("should parse properly", () => {
    const options = massarg()
      .option({
        name: "number",
        parse: (v) => parseInt(v),
      })
      .parseArgs(["--number", "10"])
    expect(options).toHaveProperty("number", 10)
  })

  test("should read from alias", () => {
    const options = massarg()
      .option({
        name: "number",
        aliases: ["n"],
        parse: (v) => parseInt(v),
      })
      .parseArgs(["-n", "10"])
    expect(options).toHaveProperty("number", 10)
    expect(options).toHaveProperty("n", 10)
  })

  test("should camelCase names", () => {
    const options = massarg()
      .option({
        name: "is-number",
        aliases: ["n"],
        parse: (v) => parseInt(v),
      })
      .parseArgs(["--is-number", "10"])

    expect(options).toHaveProperty("isNumber", 10)
    expect(options).toHaveProperty("is-number", 10)
    expect(options).toHaveProperty("n", 10)
  })

  test("should parse bool in correct forms", () => {
    const opts = {
      name: "bool",
      boolean: true,
    } as OptionDef<any, any>
    const noArg = massarg().option(opts).parseArgs(["--bool"])
    expect(noArg).toHaveProperty("bool", true)

    const truthyNumArg = massarg().option(opts).parseArgs(["--bool", "1"])
    expect(truthyNumArg).toHaveProperty("bool", true)

    const falsyNumArg = massarg().option(opts).parseArgs(["--bool", "0"])
    expect(falsyNumArg).toHaveProperty("bool", false)
  })

  test("should expect value when not bool", () => {
    const opts = {
      name: "number",
      parse: (v) => parseInt(v),
    } as OptionDef<any, any>
    expect(() => massarg().option(opts).parseArgs(["--number"])).toThrow("Missing value for: number")
  })

  test("should parse array in correct forms", () => {
    const opts = {
      name: "array",
      array: true,
    } as OptionDef<any, any>

    const arr0el = massarg().option(opts).parseArgs([])
    expect(arr0el).toHaveProperty("array", [])

    const arr1el = massarg().option(opts).parseArgs(["--array", "something"])
    expect(arr1el).toHaveProperty("array", ["something"])

    const arr2el = massarg().option(opts).parseArgs(["--array", "something", "--array", "another"])
    expect(arr2el).toHaveProperty("array", ["something", "another"])
  })
})
