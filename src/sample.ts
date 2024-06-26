import { massarg } from '.'
import { MassargCommand } from './command'
import { ParseError } from './error'

type A = {
  bool?: boolean
  number?: number
  string?: string
}
const echoCmd = massarg<{}>({
  name: 'echo',
  description: 'Echo back the arguments',
  aliases: ['e'],
  run: (opts) => {
    console.log('Echoing back', opts)
  },
})
const throwCmd = massarg<{}>({
  name: 'throw',
  description: 'Throw an error',
  aliases: ['t'],
  run: () => {
    throw new Error('This is an error')
  },
})
const addCmd = massarg<{ component: string }>({
  name: 'add',
  description: 'Add a component',
  aliases: ['a'],
  run: (opts, parser) => {
    console.log('Adding component', opts)
  },
})
  .option({
    name: 'component',
    description:
      'Component to add. Ut consectetur eu et occaecat enim magna amet eiusmod laboris deserunt proident culpa nulla ipsum adipiscing ullamco laboris sed est',
    aliases: ['c'],
    isDefault: true,
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
  .example({
    description: 'Add a component',
    input: 'my-cli add foo',
    output: 'Adding component foo',
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

const main = massarg<A>({
  name: 'my-cli',
  description: 'This is an example CLI',
})
  .help({
    bindOption: true,
    bindCommand: true,
    headerText: 'This is the header',
    footerText: 'This is the footer',
    optionOptions: {
      displayNegations: true,
    },
  })
  .main((opts, _parser) => {
    console.log('Main command - printing all opts')
    console.log(opts, '\n')
    if (opts.bool) {
      throw new Error('Bool is true')
    }
  })
  .command(echoCmd)
  .command(addCmd)
  .command(removeCmd)
  .command(throwCmd)
  .flag({
    name: 'bool',
    description: 'Example boolean option',
    aliases: ['b'],
    negatable: true,
    defaultValue: false,
  })
  .option({
    name: 'string',
    description: 'A string option',
    aliases: ['s'],
  })
  .option({
    name: 'number',
    description: 'Example number option',
    aliases: ['n'],
    type: 'number',
  })
  .example({
    description: 'Example main command',
    input: 'my-cli --bool --number 123',
    output: 'Main command - printing all opts\n{ bool: true, number: 123 }',
  })
  .example({
    description: 'Example add command',
    input: 'my-cli add --component foo --classes bar --classes baz --custom 123',
    output: '42',
  })

// console.log("Opts:", main.getArgs(process.argv.slice(2)), "\n")

main.parse(process.argv.slice(2))
