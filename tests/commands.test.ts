import massarg from "../src"

describe("Commands", () => {
  test("should run command", () => {
    const cmd = jest.fn()
    massarg()
      .command({
        name: "cmd",
        aliases: ["c"],
        run: cmd,
      })
      .parse(["cmd"])
    expect(cmd).toHaveBeenCalledTimes(1)
  })
  test("should run command with alias", () => {
    const cmd = jest.fn()
    massarg()
      .command({
        name: "cmd",
        aliases: ["c"],
        run: cmd,
      })
      .parse(["c"])
    expect(cmd).toHaveBeenCalledTimes(1)
  })
})
