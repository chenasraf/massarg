import { MassargCommand } from '../src/command'
import { massarg } from '../src/index'

const opts = {
  name: 'test',
  description: 'test',
}
test('example', () => {
  const command = massarg(opts)
  expect(command.example).toBeInstanceOf(Function)
  expect(command.example({ description: 'test', input: '', output: '' })).toBeInstanceOf(
    MassargCommand,
  )
})
