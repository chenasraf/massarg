import { MassargCommand } from '../src/command'
import { massarg } from '../src/index'

const opts = {
  name: 'test',
  description: 'test',
}
test('constructor', () => {
  expect(massarg(opts)).toBeInstanceOf(MassargCommand)
})

describe('sub command', () => {
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
    ).toEqual({ extra: ['--test', 'test'] })
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
  test('extra values', () => {
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
    const command = massarg(opts)
      .main(fn)
      .flag({ name: 'test', description: 'test', aliases: [] })
      .option({ name: 'test2', description: 'test', aliases: [] })
      .help({ bindCommand: true, bindOption: true })
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
