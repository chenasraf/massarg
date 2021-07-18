import massarg from "."

massarg()
  // .help({
  //   // printWidth: 0,
  //   binName: "my-cmd",
  //   useGlobalColumns: true,
  //   header: "This is the app description",
  //   footer: "Copyright",
  //   usageExample: "command [options]",
  //   useColors: false,
  // })
  // .option({
  //   name: "bool",
  //   aliases: ["b"],
  //   defaultValue: false,
  //   commands: ["do", "cc"],
  //   description: "This is a boolean arg. Supply it without value to set as true, or set value 0 for false",
  //   required: true,
  //   parse: Boolean,
  // })
  // .option({
  //   name: "number",
  //   aliases: ["n"],
  //   description: "This is a number arg, if you include this option, you must supply it with a value.",
  //   defaultValue: 0,
  //   commands: "do",
  //   parse: (v) => parseInt(v),
  // })
  // .command({
  //   name: "do-something",
  //   description: "This command does something. This description is just to fill the blanks. Don't kill the messenger.",
  //   aliases: ["do", "d"],
  //   run: console.log.bind(undefined, "do"),
  // })
  // .command({
  //   name: "my-custom-command",
  //   description:
  //     "This is another command that does something. It's a different one just to see more available. This " +
  //     "description is just to fill the blanks. Don't kill the messenger.",
  //   aliases: ["cc", "c"],
  //   run: console.log.bind(undefined, "do"),
  // })
  // .main(console.log.bind(undefined, "main"))
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
  .parse()
