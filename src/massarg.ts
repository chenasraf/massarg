import { ArgsObject, CommandConfig, MassargCommand } from './command'

/** A minimal command config that can be used to create a top-level command. */
export type MinimalCommandConfig<Args extends ArgsObject = ArgsObject> = Omit<
  CommandConfig<Args>,
  'aliases' | 'run'
> &
  Partial<Pick<CommandConfig<Args>, 'aliases' | 'run'>>

/**
 * This class behaves similarly to {@link MassargCommand}, but it accepts only params that are relevant
 * to the top-level command.
 *
 * @see {@link massarg}
 * @see {@link MassargCommand}
 */
export class Massarg<Args extends ArgsObject = ArgsObject> extends MassargCommand<Args> {
  constructor(options: MinimalCommandConfig<Args>) {
    // TODO consider re-using name and description for general help, and pass them to super
    super({
      aliases: [],
      run: () => {
        console.log(this.helpString())
        // throw new Error("No main command provided")
      },
      ...options,
    })
  }
}

/**
 * Creates a new top-level command.
 * @see {@link MassargCommand}
 * @see {@link Massarg}
 */
export function massarg<Args extends ArgsObject = ArgsObject>(
  options: MinimalCommandConfig<Args>,
): MassargCommand<Args> {
  return new Massarg(options)
}
