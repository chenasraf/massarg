import { MassargCommand } from '../src/command'
import { defaultHelpConfig } from '../src/help'
import { massarg } from '../src/index'

const opts = {
  name: 'test',
  description: 'test',
}
test('constructor', () => {
  expect(massarg(opts)).toBeInstanceOf(MassargCommand)
})

describe('command', () => {
  test('add', () => {
    const command = massarg(opts)
    expect(command.command).toBeInstanceOf(Function)
    expect(command.command({ name: 'test2', description: 'test2', run: jest.fn() })).toBeInstanceOf(
      MassargCommand,
    )
  })
  test('add duplicate', () => {
    expect(() =>
      massarg(opts)
        .command({ name: 'test2', description: 'test2', run: jest.fn() })
        .command({ name: 'test2', description: 'test2', run: jest.fn() }),
    ).toThrow('Command "test2" already exists')
  })
  test('validate', () => {
    expect(() =>
      massarg(opts).command({
        name: 'test2',
        description: 123 as any,
        run: jest.fn(),
      }),
    ).toThrow('Expected string, received number')
  })
})

describe('option', () => {
  test('add', () => {
    const command = massarg(opts)
    expect(command.option).toBeInstanceOf(Function)
    expect(
      command.option({ name: 'test2', description: 'test2', aliases: [], defaultValue: '' }),
    ).toBeInstanceOf(MassargCommand)
  })
  test('validate', () => {
    expect(() =>
      massarg(opts).option({
        name: 'test2',
        description: 123 as any,
        aliases: [],
        defaultValue: '',
      }),
    ).toThrow('Expected string, received number')
  })
  test('add duplicate', () => {
    expect(() =>
      massarg(opts)
        .option({
          name: 'test2',
          description: 'test2',
          aliases: [],
          defaultValue: '',
        })
        .option({
          name: 'test2',
          description: 'test2',
          aliases: [],
          defaultValue: '',
        }),
    ).toThrow('Option "test2" already exists')
  })
  test('add 2 defaults', () => {
    expect(() =>
      massarg(opts)
        .option({
          name: 'test',
          description: 'test2',
          aliases: [],
          isDefault: true,
        })
        .option({
          name: 'test2',
          description: 'test2',
          aliases: [],
          isDefault: true,
        }),
    ).toThrow(
      'Option "test2" cannot be set as default because option "test" is already set as default',
    )
  })
})

describe('flag', () => {
  test('add', () => {
    const command = massarg(opts)
    expect(command.flag).toBeInstanceOf(Function)
    expect(command.flag({ name: 'test2', description: 'test2', aliases: [] })).toBeInstanceOf(
      MassargCommand,
    )
  })
  test('add duplicate', () => {
    expect(() =>
      massarg(opts)
        .flag({ name: 'test2', description: 'test2', aliases: [] })
        .flag({ name: 'test2', description: 'test2', aliases: [] }),
    ).toThrow('Flag "test2" already exists')
  })
  test('validate', () => {
    expect(() =>
      massarg(opts).flag({
        name: 'test2',
        description: 123 as any,
        aliases: [],
      }),
    ).toThrow('Expected string, received number')
  })
})

describe('example', () => {
  test('example', () => {
    const command = massarg(opts)
    expect(command.example).toBeInstanceOf(Function)
    expect(command.example({ description: 'test', input: '', output: '' })).toBeInstanceOf(
      MassargCommand,
    )
  })
})

describe('help', () => {
  test('default value', () => {
    const command = massarg(opts)
    expect(command.helpConfig).toEqual(defaultHelpConfig)
  })

  test('init', () => {
    const command = massarg(opts).help({
      bindOption: true,
      optionOptions: {
        namePrefix: '__',
      },
    })
    expect(command.help).toBeInstanceOf(Function)
    expect(command.helpConfig).toHaveProperty('bindOption', true)
    expect(command.helpConfig).toHaveProperty('optionOptions.namePrefix', '__')
    expect(command.helpConfig).toHaveProperty('optionOptions.aliasPrefix', '-')
    expect(command.helpConfig).toHaveProperty('optionOptions.nameStyle.color', 'yellow')
  })

  test('binds command', () => {
    const command = massarg(opts).help({
      bindCommand: true,
    })
    expect(command.help).toBeInstanceOf(Function)
    expect(command.helpConfig).toHaveProperty('bindCommand', true)
    expect(command.commands.find((o) => o.name === 'help')).toBeTruthy()
  })

  test('binds option', () => {
    const command = massarg(opts).help({
      bindOption: true,
    })
    expect(command.help).toBeInstanceOf(Function)
    expect(command.helpConfig).toHaveProperty('bindOption', true)
    expect(command.options.find((o) => o.name === 'help')).toBeTruthy()
  })

  test('help string', () => {
    const command = massarg(opts)
    expect(command.helpString()).toContain(`Usage:`)
  })

  test('print help', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    const command = massarg(opts)
    command.printHelp()
    expect(log).toHaveBeenCalled()
  })
})

describe('getArgs', () => {
  test('basic', () => {
    expect(massarg(opts).getArgs([])).toEqual({})
    expect(
      massarg(opts)
        .option({
          name: 'test',
          description: 'test',
          aliases: [],
        })
        .getArgs(['--test', 'test']),
    ).toEqual({ test: 'test' })
  })

  test('stops after command', () => {
    expect(
      massarg(opts)
        .command({ name: 'test', description: 'test', run: jest.fn() })
        .getArgs(['test', '--test', 'test']),
    ).toEqual({})
  })

  test('alias', () => {
    expect(
      massarg(opts)
        .option({
          name: 'test',
          description: 'test',
          aliases: ['t'],
        })
        .getArgs(['-t', 'test']),
    ).toEqual({ test: 'test' })
  })

  test('default value', () => {
    expect(
      massarg(opts)
        .option({
          name: 'test',
          description: 'test',
          aliases: [],
          defaultValue: 'test',
        })
        .getArgs([]),
    ).toEqual({ test: 'test' })
  })

  test('override default', () => {
    expect(
      massarg(opts)
        .option({
          name: 'test',
          description: 'test',
          aliases: [],
          defaultValue: 'test',
        })
        .getArgs(['--test', 'test2']),
    ).toEqual({ test: 'test2' })
  })

  test('override duplicate option', () => {
    expect(
      massarg(opts)
        .option({
          name: 'test',
          description: 'test',
          aliases: [],
          defaultValue: 'test',
        })
        .getArgs(['--test', 'test2', '--test', 'test3']),
    ).toEqual({ test: 'test3' })
  })

  test('default option', () => {
    expect(
      massarg(opts)
        .option({
          name: 'test',
          description: 'test',
          aliases: [],
          isDefault: true,
        })
        .getArgs(['test3']),
    ).toEqual({ test: 'test3' })
  })
  test('prefers command over default', () => {
    expect(
      massarg(opts)
        .command({
          name: 'test3',
          description: 'test3',
          run: jest.fn(),
        })
        .option({
          name: 'test',
          description: 'test',
          aliases: [],
          isDefault: true,
        })
        .getArgs(['test3']),
    ).toEqual({})
  })
  test.skip('extra values', () => {
    expect(
      massarg(opts)
        .command({
          name: 'test3',
          description: 'test3',
          run: jest.fn(),
        })
        .option({
          name: 'test',
          description: 'test',
          aliases: [],
        })
        .getArgs(['test3', 'test2']),
    ).toEqual({ extra: ['test2'] })
  })
})

describe('parse', () => {
  test('runs command', () => {
    const fn = jest.fn()
    const command = massarg(opts).command({
      name: 'test',
      description: 'test',
      run: fn,
    })
    expect(command).toBeInstanceOf(MassargCommand)
    expect(command.parse(['test'])).toBeUndefined()
    expect(fn).toHaveBeenCalled()
  })
  test('runs main', () => {
    const fn = jest.fn()
    const command = massarg(opts).main(fn)
    expect(command).toBeInstanceOf(MassargCommand)
    expect(command.parse([])).toBeUndefined()
    expect(fn).toHaveBeenCalledWith({}, command)
  })
  test('runs main with args', () => {
    const fn = jest.fn()
    const command = massarg(opts)
      .option({ name: 'test', description: 'test', aliases: [] })
      .main(fn)
    expect(command).toBeInstanceOf(MassargCommand)
    expect(command.parse(['--test', 'test'])).toBeUndefined()
    expect(fn).toHaveBeenCalledWith({ test: 'test' }, command)
  })
  // test('throws with unknown option', () => {
  //   expect(() => massarg(opts).parse(['--test', 'test'])).toThrow('Unknown option "test"')
  // })
  // test('throws with unknown command', () => {
  //   expect(() => massarg(opts).parse(['test'])).toThrow('Unknown command "test"')
  // })
  // test('throws without main command', () => {
  //   expect(() => massarg(opts).parse([])).toThrow('No main command')
  // })
})

describe('main', () => {
  test('add', () => {
    const fn = jest.fn()
    const command = massarg(opts)
    expect(command.main).toBeInstanceOf(Function)
    expect(command.main(fn)).toBeInstanceOf(MassargCommand)
  })
})
