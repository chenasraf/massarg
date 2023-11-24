import z from 'zod'
import { ValidationError } from './error'

export const ExampleConfig = z.object({
  /** Description of the example. This will appear as a title above the input/output line(s). */
  description: z.string().optional(),
  /**
   * Input of the example. This will appear as a line below the description, with a `$` prefix.
   * The prefix can be changed using the `help()` function on the command.
   */
  input: z.string().optional(),
  /**
   * Output of the example. This will appear as a line below the input, with a `>` prefix.
   * The prefix can be changed using the `help()` function on the command.
   */
  output: z.string().optional(),
})
export type ExampleConfig = z.infer<typeof ExampleConfig>

export class MassargExample {
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
