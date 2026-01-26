import { vi } from 'vitest'
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
    expect(command.command({ name: 'test2', description: 'test2', run: vi.fn() })).toBeInstanceOf(
      MassargCommand,
    )
  })
  test('add duplicate', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => { })
    expect(() =>
      massarg(opts)
        .command({ name: 'test2', description: 'test2', run: vi.fn() })
        .command({ name: 'test2', description: 'test2', run: vi.fn() }),
    ).toThrow('Command "test2" already exists')
    error.mockRestore()
  })
  test('validate', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => { })
    expect(() =>
      massarg(opts).command({
        name: 'test2',
        description: 123 as any,
        run: vi.fn(),
      }),
    ).toThrow('Invalid input: expected string, received number')
    error.mockRestore()
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
        .command({ name: 'test', description: 'test', run: vi.fn() })
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
          run: vi.fn(),
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
          run: vi.fn(),
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
    const fn = vi.fn()
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
    const fn = vi.fn()
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
    const fn = vi.fn()
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
    const fn = vi.fn()
    const command = massarg(opts)
    expect(command.main).toBeInstanceOf(Function)
    expect(command.main(fn)).toBeInstanceOf(MassargCommand)
  })
})

describe('onError', () => {
  let mockExit: ReturnType<typeof vi.spyOn>
  let mockConsoleError: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    mockExit = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    mockExit.mockRestore()
    mockConsoleError.mockRestore()
  })

  test('add handler', () => {
    const handler = vi.fn()
    const command = massarg(opts)
    expect(command.onError).toBeInstanceOf(Function)
    expect(command.onError(handler)).toBeInstanceOf(MassargCommand)
  })

  test('default error handler logs to stderr', () => {
    const command = massarg(opts).option({
      name: 'required-opt',
      description: 'required option',
      aliases: [],
      required: true,
    })
    command.parse([])

    expect(mockConsoleError).toHaveBeenCalled()
    expect(mockExit).toHaveBeenCalledWith(1)
  })

  test('custom error handler is called', () => {
    const handler = vi.fn()
    const command = massarg(opts)
      .onError(handler)
      .option({
        name: 'required-opt',
        description: 'required option',
        aliases: [],
        required: true,
      })
    command.parse([])

    expect(handler).toHaveBeenCalled()
    expect(handler.mock.calls[0][0]).toBeInstanceOf(Error)
    expect(mockExit).toHaveBeenCalledWith(1)
  })

  test('custom error handler overrides default', () => {
    const handler = vi.fn()
    const command = massarg(opts)
      .onError(handler)
      .option({
        name: 'required-opt',
        description: 'required option',
        aliases: [],
        required: true,
      })
    command.parse([])

    expect(handler).toHaveBeenCalled()
    expect(mockConsoleError).not.toHaveBeenCalled()
  })

  test('error handler catches errors from run function', () => {
    const handler = vi.fn()
    const command = massarg(opts)
      .onError(handler)
      .main(() => {
        throw new Error('main error')
      })
    command.parse([])

    expect(handler).toHaveBeenCalled()
    expect(handler.mock.calls[0][0].message).toBe('main error')
    expect(mockExit).toHaveBeenCalledWith(1)
  })

  test('error handler propagates to subcommands', () => {
    const handler = vi.fn()
    const command = massarg(opts)
      .onError(handler)
      .command({
        name: 'sub',
        description: 'sub command',
        run: () => {
          throw new Error('sub error')
        },
      })
    command.parse(['sub'])

    expect(handler).toHaveBeenCalled()
    expect(handler.mock.calls[0][0].message).toBe('sub error')
  })

  test('error handler catches async errors', async () => {
    const handler = vi.fn()
    const command = massarg(opts)
      .onError(handler)
      .main(async () => {
        await Promise.resolve()
        throw new Error('async error')
      })

    await command.parse([])

    expect(handler).toHaveBeenCalled()
    expect(handler.mock.calls[0][0].message).toBe('async error')
    expect(mockExit).toHaveBeenCalledWith(1)
  })
})
