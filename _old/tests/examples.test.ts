import massarg from "../src"

describe("Examples", () => {
  describe("basic parse", () => {
    test("should parse input only", () => {
      const helpStr = massarg()
        .help({ binName: "test", useColors: false })
        .example({
          input: "my-cmd --number 10",
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
          "Examples:" +
          "\n\n" +
          "  $ my-cmd --number 10" +
          "\n"
      )
    })

    test("should parse output", () => {
      const helpStr = massarg()
        .help({ binName: "test", useColors: false })
        .example({
          input: "my-cmd --number 10",
          output: "Your number is 10 which is an integer",
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
          "Examples:" +
          "\n\n" +
          "  $ my-cmd --number 10" +
          "\n" +
          "  ➜ Your number is 10 which is an integer" +
          "\n"
      )
    })
  })

  test("should wrap input properly", () => {
    const helpStr = massarg()
      .help({ binName: "test", useColors: false })
      .example({
        input: "my-cmd --number 10 --another-number 20 --and-yet-another-number 30 --what-about-another 40",
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
        "Examples:" +
        "\n\n" +
        "  $ my-cmd --number 10 --another-number 20 --and-yet-another-number 30" +
        "\n" +
        "    --what-about-another 40" +
        "\n"
    )
  })

  test("should wrap description properly", () => {
    const helpStr = massarg()
      .help({ binName: "test", useColors: false })
      .example({
        input: "my-cmd --number 10",
        description:
          "This is a really long test. Very long text indeed, which should eventually span to more than 1 line, so indentation can be tested.",
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
        "Examples:" +
        "\n\n" +
        "  This is a really long test. Very long text indeed, which should eventually" +
        "\n" +
        "  span to more than 1 line, so indentation can be tested." +
        "\n\n" +
        "  $ my-cmd --number 10" +
        "\n"
    )
  })
})
