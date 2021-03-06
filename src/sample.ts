import massarg from "."

massarg()
  .help({
    // printWidth: 0,
    binName: "my-cmd",
    useGlobalColumns: true,
    header: "This is the header",
    footer: "This is the footer",
    usageExample: "command [options]",
  })
  .option({
    name: "bool",
    aliases: ["b"],
    defaultValue: false,
    commands: ["do", "cc"],
    description: "This is a boolean arg. Supply it without value or with 1 to set as true, or set value 0 for false",
    required: true,
    parse: Boolean,
  })
  .option({
    name: "number",
    aliases: ["n"],
    description: "This is a number arg, if you include this option, you must supply it with a value.",
    defaultValue: 0,
    commands: "do",
    parse: (v) => parseInt(v),
  })
  .command({
    name: "do-something",
    description: "This command does something.",
    aliases: ["do", "d"],
    run: console.log.bind(undefined, "do"),
  })
  .command({
    name: "my-custom-command",
    description:
      "This is another command that does something. It's a different one just to see more available. This " +
      "description is just to fill more lines.",
    aliases: ["cc", "c"],
    run: console.log.bind(undefined, "do"),
  })
  .main(console.log.bind(undefined, "main"))
  .example({
    input: "my-cmd test --one --two",
    description: "This is how you do it",
    output: "42",
  })
  // .command({
  //   name: "cmd",
  //   description: "Command",
  //   run: () => void 0,
  // })
  // .option({
  //   name: "number",
  //   description: "Number value",
  //   commands: "cmd",
  //   parse: (v) => parseInt(v),
  // })
  .parse()
