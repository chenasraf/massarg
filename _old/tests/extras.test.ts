import massarg from "../src"

describe("Extras", () => {
  test("should take extra values unparsed", () => {
    const options = massarg()
      .option({
        name: "number",
        parse: (v) => parseInt(v),
      })
      .parseArgs(["--number", "10", "app name"])
    expect(options).toHaveProperty("number", 10)
    expect(options).toHaveProperty("extras", ["app name"])
  })
})
