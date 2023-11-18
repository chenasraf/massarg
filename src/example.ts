import { massarg } from "."
import MassargCommand from "./command"

type A = { test: boolean }
const args = massarg<A>({
  name: "my-cli",
  description: "This is an example CLI",
})
  .main((opts) => {
    console.log("Main command - printing all opts")
    console.log(opts)
  })
  .command(
    new MassargCommand<A>({
      name: "command",
      description: "Example command",
      aliases: ["c"],
      run: (opts) => {
        console.log("`command` Command - printing all opts")
        console.log(opts)
      },
    }).option({
      name: "command-option",
      description: "Example command option",
      aliases: ["o"],
      // aliases: "" as never,
    }),
  )
  .option({
    name: "number",
    description: "Example number option",
    aliases: ["n"],
    type: "number",
    parse: (s) => parseFloat(s),
  })

const opts = args.getArgs(process.argv.slice(2))

console.log("Opts:", opts)

args.parse(process.argv.slice(2))
