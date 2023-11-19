import chalk from "chalk"
import { color, colorCount } from "../src/utils"

describe("Utils", () => {
  describe("Color", () => {
    test("should reset color around text", () => {
      expect(color("green", "test")).toBe(chalk.reset`${chalk.green`test`}`)
    })
    test("should work with arrays", () => {
      expect(color(["green", "bgGray"], "test")).toBe(chalk.reset`${chalk.bgGray`${chalk.green`test`}`}`)
    })
  })

  describe("Color Count", () => {
    test("should parse correct color counts", () => {
      expect(colorCount(["dim", "yellow"])).toBe(2)
      expect(colorCount(["dim", "yellow"], "green")).toBe(3)
      expect(colorCount(["dim", "yellow"], "green", ["red"])).toBe(4)
    })
  })
})
