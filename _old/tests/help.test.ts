import massarg from "../src"

describe("Print Help", () => {
  test("should print to console", () => {
    const mock = jest.spyOn(console, "log").mockImplementation(() => void 0)
    massarg()
      .help({ binName: "test", useColors: false })
      .option({
        name: "number",
        description: "Number value",
        parse: (v) => parseInt(v),
      })
      .printHelp()
    expect(mock).toBeCalled()
    mock.mockRestore()
  })

  test("should print header & footer", () => {
    const helpStr = massarg()
      .help({ binName: "test", useColors: false, header: "This is a header", footer: "This is a footer" })
      .option({
        name: "number",
        description: "Number value",
        parse: (v) => parseInt(v),
      })
      .getHelpString()
      .join("\n")

    expect(helpStr).toBe(
      "Usage: test [command] [options]" +
        "\n\n" +
        "This is a header" +
        "\n\n" +
        "Options:" +
        "\n\n" +
        "  --help|-h    Display help information" +
        "\n\n" +
        "  --number     Number value" +
        "\n\n" +
        "This is a footer" +
        "\n"
    )
  })

  test("should print default value", () => {
    const helpStr = massarg()
      .help({ binName: "test", useColors: false })
      .option({
        name: "number",
        description: "Number value",
        defaultValue: 0,
        parse: (v) => parseInt(v),
      })
      .getHelpString()
      .join("\n")

    expect(helpStr).toBe(
      "Usage: test [command] [options]" +
        "\n\n" +
        "Options:" +
        "\n\n" +
        "  --help|-h    Display help information" +
        "\n\n" +
        "  --number     Number value (default: 0)" +
        "\n"
    )
  })

  test("should print help without command options", () => {
    const helpStr = massarg()
      .help({ binName: "test", useColors: false })
      .option({
        name: "number",
        description: "Number value",
        parse: (v) => parseInt(v),
      })
      .getHelpString()
      .join("\n")

    expect(helpStr).toBe(
      "Usage: test [command] [options]" +
        "\n\n" +
        "Options:" +
        "\n\n" +
        "  --help|-h    Display help information" +
        "\n\n" +
        "  --number     Number value" +
        "\n"
    )
  })

  test("should not throw when passing args", () => {
    expect(() =>
      massarg()
        .help({ binName: "test", useColors: false })
        .option({
          name: "number",
          description: "Number value",
          parse: (v) => parseInt(v),
        })
        .getHelpString(["--help"])
        .join("\n")
    ).not.toThrow()
  })

  test("should print help correctly with only global options", () => {
    const helpStr = massarg()
      .help({ binName: "test", useColors: false })
      .command({
        name: "cmd",
        description: "Command",
        run: () => void 0,
      })
      .option({
        name: "number",
        description: "Number value",
        parse: (v) => parseInt(v),
      })
      .getHelpString()
      .join("\n")

    expect(helpStr).toBe(
      "Usage: test [command] [options]" +
        "\n\n" +
        "Commands:" +
        "\n\n" +
        "  cmd    Command" +
        "\n\n" +
        "Options:" +
        "\n\n" +
        "  --help|-h    Display help information" +
        "\n\n" +
        "  --number     Number value" +
        "\n"
    )
  })

  test("should print help correctly with command options", () => {
    const helpStr = massarg()
      .help({ binName: "test", useColors: false })
      .command({
        name: "cmd",
        description: "Command",
        run: () => void 0,
      })
      .option({
        name: "number",
        description: "Number value",
        commands: "cmd",
        parse: (v) => parseInt(v),
      })
      .getHelpString()
      .join("\n")

    expect(helpStr).toBe(
      "Usage: test [command] [options]" +
        "\n\n" +
        "Commands:" +
        "\n\n" +
        "  cmd    Command" +
        "\n\n" +
        "Command Options:" +
        "\n\n" +
        "cmd:" +
        "\n\n" +
        "  --number    Number value" +
        "\n\n" +
        "Global Options:" +
        "\n\n" +
        "  --help|-h    Display help information" +
        "\n"
    )
  })
})
