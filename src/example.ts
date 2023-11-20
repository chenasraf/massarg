import z from 'zod'
import { ValidationError } from './error'

export const ExampleConfig = z.object({
  description: z.string().optional(),
  input: z.string().optional(),
  output: z.string().optional(),
})
export type ExampleConfig = z.infer<typeof ExampleConfig>

export default class MassargExample {
  description: string | undefined
  input: string | undefined
  output: string | undefined

  constructor(config: ExampleConfig) {
    ExampleConfig.parse(config)
    if (
      config.description === undefined &&
      config.input === undefined &&
      config.output === undefined
    ) {
      throw new ValidationError({
        code: 'invalid_example',
        message: 'Example must have at least one of description, input, or output',
        path: ['example'],
      })
    }
    this.description = config.description
    this.input = config.input
    this.output = config.output
  }
}
export { MassargExample }
