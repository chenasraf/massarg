import MassargCommand, { ArgsObject, CommandConfig } from "./command"

type MinimalCommandConfig<Args extends ArgsObject> = Omit<CommandConfig<Args>, "aliases" | "run">

export default class Massarg<Args extends ArgsObject = ArgsObject> extends MassargCommand<Args> {
  constructor(options: MinimalCommandConfig<Args>) {
    // TODO consider re-using name and description for general help, and pass them to super
    super({
      ...options,
      aliases: [],
      run: () => {
        throw new Error("Massarg is not a command")
      },
    })
  }
}
export { Massarg }

export function massarg<Args extends ArgsObject = ArgsObject>(
  options: MinimalCommandConfig<Args>,
): MassargCommand<Args> {
  return new Massarg(options)
}
