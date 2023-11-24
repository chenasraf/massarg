import { defaultHelpConfig } from '../src/help'
import { massarg } from '../src/index'

const opts = {
  name: 'test',
  description: 'test',
}

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
