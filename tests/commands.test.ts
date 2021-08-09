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

  test("should consume the first command, then treat the rest as extras", () => {
    const cmd = jest.fn()
    const opt = jest.fn()
    const def = massarg()
      .command({
        name: "cmd",
        aliases: ["c"],
        run: cmd,
      })
      .command({
        name: "opt",
        aliases: ["o"],
        run: opt,
      })

    const options = def.parseArgs(["cmd", "opt"])

    def.parse(["cmd", "opt"])

    expect(cmd).toHaveBeenCalledTimes(1)
    expect(opt).not.toHaveBeenCalled()
    expect(options.extras).toContain("opt")
  })
})
