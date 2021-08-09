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

  test("should consume the first command, then pass to default", () => {
    const cmd1 = jest.fn()
    const cmd2 = jest.fn()
    const def = massarg<{ opt: string }>()
      .command({
        name: "cmd1",
        aliases: ["c1"],
        run: cmd1,
      })
      .command({
        name: "cmd2",
        aliases: ["c2"],
        run: cmd2,
      })
      .option({
        name: "opt",
        isDefault: true,
        aliases: ["o"],
        commands: ["c1"],
        required: true,
      })

    const options = def.parseArgs(["cmd1", "opt"])

    def.parse(["cmd1", "opt"])

    expect(cmd1).toHaveBeenCalledTimes(1)
    expect(cmd2).not.toHaveBeenCalled()
    expect(options.opt).toBe("opt")
  })

  test("should consume the first command, then pass to default when option name matches command name", () => {
    const cmd1 = jest.fn()
    const opt = jest.fn()
    const def = massarg<{ opt: string }>()
      .command({
        name: "cmd1",
        aliases: ["c1"],
        run: cmd1,
      })
      .command({
        name: "opt",
        aliases: ["o"],
        run: opt,
      })
      .option({
        name: "opt",
        isDefault: true,
        aliases: ["o"],
        commands: ["c1"],
        required: true,
      })

    const options = def.parseArgs(["cmd1", "opt"])

    def.parse(["cmd1", "opt"])

    expect(cmd1).toHaveBeenCalledTimes(1)
    expect(opt).not.toHaveBeenCalled()
    expect(options.opt).toBe("opt")
  })
})
