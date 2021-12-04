import chalk from "chalk"
import massarg from "../src"
import { OptionDef } from "../src/types"

describe("Options", () => {
  describe("basics", () => {
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
  })

  describe("parsing", () => {
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

    describe("bool", () => {
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
    })

    describe("array", () => {
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

    test("should expect value when not bool", () => {
      expect(() =>
        massarg()
          .option({
            name: "number",
            parse: (v) => parseInt(v),
          })
          .parseArgs(["--number"])
      ).toThrow("Missing value for: number")
    })

    describe("isDefault", () => {
      test("should parse default with one default", () => {
        const options = massarg()
          .option({
            name: "number",
            isDefault: true,
            parse: (v) => parseInt(v),
          })
          .option({
            name: "bool",
            isDefault: false,
            boolean: true,
          })
          .parseArgs(["1"])

        expect(options).toHaveProperty("number", 1)
        expect(options).not.toHaveProperty("bool", true)
      })

      test("should parse default with multiple defaults", () => {
        const options = massarg()
          .option({
            name: "number",
            isDefault: true,
            parse: (v) => parseInt(v),
          })
          .option({
            name: "bool",
            isDefault: true,
            boolean: true,
          })
          .parseArgs(["1"])

        expect(options).toHaveProperty("number", 1)
        expect(options).toHaveProperty("bool", true)
      })

      test("should parse default with command", () => {
        const options = massarg()
          .command({
            name: "cmd",
            run: () => void 0,
          })
          .option({
            name: "number",
            isDefault: true,
            parse: (v) => parseInt(v),
          })
          .parseArgs(["cmd", "1"])

        expect(options).toHaveProperty("number", 1)
      })
    })

    describe("required", () => {
      const mockProcessExit = jest.spyOn(process, "exit").mockImplementation((code) => {
        throw new Error(`Process.exit(${code})`) // Forces the code to throw instead of exit
      })
      beforeEach(() => {
        mockProcessExit.mockClear()
      })

      test("should throw on missing required value", () => {
        const mockConsoleError = jest.spyOn(console, "error").mockImplementation(() => void 0)
        const mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => void 0)

        expect(() =>
          massarg()
            .option({
              name: "number",
              parse: (v) => parseInt(v),
              required: true,
            })
            .parse(["--not-number", "abcdefg"])
        ).toThrow("Process.exit(1)")
        expect(mockConsoleError).toBeCalledWith(
          chalk.red`Option: \`number\` is required, but was not defined. Try using: \`--number \{value\}\``
        )
        mockConsoleError.mockRestore()
        mockConsoleLog.mockRestore()
      })

      test("should not throw on existing required value for command", () => {
        const mockConsoleError = jest.spyOn(console, "error").mockImplementation(() => void 0)
        const mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => void 0)
        expect(() =>
          massarg()
            .option({
              name: "number",
              parse: (v) => parseInt(v),
              commands: "cmd",
              required: true,
            })
            .command({
              name: "cmd",
              run: () => void 0,
            })
            .parse(["cmd", "--number", "10"])
        ).not.toThrow("Option: `number` is required, but was not defined. Try using: `--number {value}`")
        mockConsoleError.mockRestore()
        mockConsoleLog.mockRestore()
      })

      test("should throw on missing required value for command", () => {
        const mockConsoleError = jest.spyOn(console, "error").mockImplementation(() => void 0)
        const mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => void 0)
        expect(() =>
          massarg()
            .option({
              name: "number",
              parse: (v) => parseInt(v),
              commands: "cmd",
              required: true,
            })
            .command({
              name: "cmd",
              run: () => void 0,
            })
            .parse(["cmd"])
        ).toThrow("Process.exit(1)")
        expect(mockConsoleError).toBeCalledWith(
          chalk.red`Option: \`number\` is required for command: \`cmd\`, but was not defined. Try using: \`--number \{value\}\``
        )
        mockConsoleError.mockRestore()
        mockConsoleLog.mockRestore()
      })
    })
  })
})
