import { massarg } from '.'
import MassargCommand from './command'
import { ParseError } from './error'

type A = { test: boolean }
const echoCmd = massarg<any>({
  name: 'echo',
  description: 'Echo back the arguments',
  aliases: ['e'],
  run: (opts) => {
    console.log('Echoing back', opts)
  },
})
const addCmd = massarg<{ component: string }>({
  name: 'add',
  description: 'Add a component',
  aliases: ['a'],
  run: (opts, parser) => {
    parser.printHelp()
    console.log('Adding component', opts.component)
  },
})
  .option({
    name: 'component',
    description:
      'Component to add. Ut consectetur eu et occaecat enim magna amet eiusmod laboris deserunt proident culpa nulla ipsum adipiscing ullamco laboris sed est',
    aliases: ['c'],
    // aliases: "" as never,
  })
  .option({
    name: 'classes',
    description: 'Classes to add',
    aliases: ['l'],
    array: true,
  })
  .option({
    name: 'custom',
    description: 'Custom option',
    aliases: ['x'],
    parse: (value) => {
      const asNumber = Number(value)
      if (isNaN(asNumber)) {
        throw new ParseError({
          path: ['custom'],
          message: 'Custom option must be a number',
          code: 'invalid_number',
        })
      }
      return {
        value: asNumber,
        half: asNumber / 2,
        double: asNumber * 2,
      }
    },
  })

const removeCmd = new MassargCommand<{ component: string }>({
  name: 'remove',
  description: 'Remove a component',
  aliases: ['r'],
  run: (opts) => {
    console.log('Removing component', opts.component)
  },
}).option({
  name: 'component',
  description: 'Component to remove',
  aliases: ['c'],
})

const args = massarg<A>({
  name: 'my-cli',
  description: 'This is an example CLI',
  bindHelpOption: true,
  bindHelpCommand: true,
})
  .main((opts, parser) => {
    console.log('Main command - printing all opts')
    console.log(opts, '\n')
    parser.printHelp()
  })
  .command(echoCmd)
  .command(addCmd)
  .command(removeCmd)
  .flag({
    name: 'bool',
    description: 'Example boolean option',
    aliases: ['b'],
  })
  .option({
    name: 'number',
    description: 'Example number option',
    aliases: ['n'],
    type: 'number',
  })

// console.log("Opts:", args.getArgs(process.argv.slice(2)), "\n")

args.parse(process.argv.slice(2))
