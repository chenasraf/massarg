import { MassargCommand } from '../src/command'
import { massarg } from '../src/index'

const opts = {
  name: 'test',
  description: 'test',
}
describe('option', () => {
  test('add', () => {
    const command = massarg(opts)
    expect(command.option).toBeInstanceOf(Function)
    expect(
      command.option({ name: 'test2', description: 'test2', aliases: [], defaultValue: '' }),
    ).toBeInstanceOf(MassargCommand)
  })
  test('validate', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => { })
    expect(() =>
      massarg(opts).option({
        name: 'test2',
        description: 123 as any,
        aliases: [],
        defaultValue: '',
      }),
    ).toThrow('Expected string, received number')
    error.mockRestore()
  })
  test('add duplicate', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => { })
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
    ).toThrow('test.test2: Option name "test2" already exists')
    error.mockRestore()
  })
  test('default', () => {
    const command = massarg(opts)
      .flag({
        name: 'extra',
        description: 'extra',
        aliases: [],
        negatable: true,
      })
      .option({
        name: 'def',
        description: 'def',
        aliases: [],
        isDefault: true,
      })
    expect(command.getArgs(['123'])).toHaveProperty('def', '123')
  })
  test('add 2 defaults', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => { })
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
          aliases: ['t'],
          isDefault: true,
        }),
    ).toThrow(
      'Option "test2" cannot be set as default because option "test" is already set as default',
    )
    error.mockRestore()
  })
  test('uses output name', () => {
    const command = massarg(opts).option({
      name: 'test2',
      description: 'test2',
      aliases: [],
      outputName: 'test',
    })
    expect(command.getArgs(['--test2', 'test'])).toHaveProperty('test', 'test')
  })
  test('required', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => { })
    const command = massarg(opts).option({
      name: 'test2',
      description: 'test2',
      aliases: [],
      required: true,
    })
    expect(() => command.getArgs([])).toThrow('Missing required option: test2')
    error.mockRestore()
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
    const error = jest.spyOn(console, 'error').mockImplementation(() => { })
    expect(() =>
      massarg(opts)
        .flag({ name: 'test2', description: 'test2', aliases: [] })
        .flag({ name: 'test2', description: 'test2', aliases: [] }),
    ).toThrow('test.test2: Flag name "test2" already exists')
    error.mockRestore()
  })
  test('validate', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => { })
    expect(() =>
      massarg(opts).flag({
        name: 'test2',
        description: 123 as any,
        aliases: [],
      }),
    ).toThrow('Expected string, received number')
    error.mockRestore()
  })
  describe('negation', () => {
    test('no negation', () => {
      const error = jest.spyOn(console, 'error').mockImplementation(() => { })
      const command = massarg(opts).flag({ name: 'test2', description: 'test2', aliases: [] })
      expect(() => command.getArgs(['--no-test2'])).toThrow(
        'test2: Option test2 cannot be negated (received: "--no-test2")',
      )
      error.mockRestore()
    })
    test('negation', () => {
      const command = massarg(opts).flag({
        name: 'test2',
        description: 'test2',
        aliases: [],
        negatable: true,
      })
      expect(command.getArgs(['--no-test2'])).toHaveProperty('test2', false)
    })
  })
})
