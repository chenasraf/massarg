import { massarg } from "."
import MassargCommand from "./command"
import { ParseError } from "./error"

type A = { test: boolean }
const args = massarg<A>({
  name: "my-cli",
  description: "This is an example CLI",
})
  // .main((opts) => {
  //   console.log("Main command - printing all opts")
  //   console.log(opts)
  // })
  .command(
    massarg<{ component: string }>({
      name: "add",
      description: "Add a component",
      aliases: ["a"],
      run: (opts) => {
        console.log("Adding component", opts.component)
      },
    })
      .option({
        name: "component",
        description: "Component to add",
        aliases: ["c"],
        // aliases: "" as never,
      })
      .option({
        name: "classes",
        description: "Classes to add",
        aliases: ["l"],
        array: true,
      })
      .option({
        name: "custom",
        description: "Custom option",
        aliases: ["x"],
        parse: (value) => {
          const asNumber = Number(value)
          if (isNaN(asNumber)) {
            throw new ParseError({
              path: ["custom"],
              message: "Custom option must be a number",
              code: "invalid_number",
            })
          }
          return {
            value: asNumber,
            half: asNumber / 2,
            double: asNumber * 2,
          }
        },
      }),
  )
  .command(
    new MassargCommand<{ component: string }>({
      name: "remove",
      description: "Remove a component",
      aliases: ["r"],
      run: (opts) => {
        console.log("Removing component", opts.component)
      },
    }).option({
      name: "component",
      description: "Component to remove",
      aliases: ["c"],
      // aliases: "" as never,
    }),
  )
  .option({
    name: "bool",
    description: "Example number option",
    aliases: ["b"],
    type: "boolean",
  })
  .option({
    name: "number",
    description: "Example number option",
    aliases: ["n"],
    type: "number",
  })

const opts = args.getArgs(process.argv.slice(2))

console.log("Opts:", opts)

args.parse(process.argv.slice(2))
