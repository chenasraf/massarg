import massarg from "../src"

describe("print help", () => {
  test("should print help without command options", () => {
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
        "\n\n" +
        "  --help|-h    Display help information" +
        "\n\n" +
        "  --number     Number value" +
        "\n"
    )
  })
  test("should print help correctly with only global options", () => {
    const helpStr = massarg()
      .help({ useColors: false })
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
      "Usage: processChild.js [command] [options]" +
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
      .help({ useColors: false })
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
      "Usage: processChild.js [command] [options]" +
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
