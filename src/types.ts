import { ArrayOr } from "./utils"
import chalk from "chalk"

export type OptionsBase = {
  /** When `true`, will output help text and exit the process without error */
  help: boolean

  /** This contains arguments that were not taken by any command or option. */
  extras: string[]
}

export type MainDef<Options> = (options: Options & OptionsBase) => void

export interface Named {
  name: string
  aliases?: string[]
}

export interface OptionDef<Options, Value> extends Named {
  /** Option name. When using in CLI, you will use `--name`, e.g. `--my-option`. */
  name: string

  /**
   * When `true`, any args placed without name will be applied to this option. When more than one arg is supplied
   * this way, only the last given will be used (unless the option is an array type).
   * When more than one option has this turned on, they will all be given these values. Use carefully. */
  isDefault?: boolean

  /**
   * In addition to primary name, you may also define aliases. Aliases when used in CLI should only be prefixed with
   * 1 hypen, as such: `-o`
   */
  aliases?: string[]

  /** Description of option to display in help text. */
  description?: string

  /** Default value to use when none is supplied. */
  defaultValue?: Value

  /**
   * A boolean field may be supplied without value, which will cause it to parse as `true`.
   * Additional parsing may still be done using the `parse` option.
   */
  boolean?: boolean

  /**
   * An array field will collect any inputs to it into a list. Each item in the list will be parsed with `parse` before
   * being added.
   */
  array?: boolean

  /**
   * A required option will throw an error if it's not passed as input. If you attach this option to a specific command
   * (or multiple commands), it will only be required when using that command. If not, it will be required for any
   * command.
   */
  required?: boolean

  /**
   * Commands this option is relevant for. You may use either name or alias of command, but in the help text, only the
   * name will be shown as the section title.
   *
   * If you supply none, this option will be a global option by default.
   *
   * **Please note** this does not affect parsing: every option will be available when the program is run. This is only
   * for organizing it properly in the help text. But as long as you don't use that option in a command that doesn't
   * need o use it, nothing should work differently.
   */
  commands?: ArrayOr<string>

  /**
   * Use this function to decide what to do with the arg that was passed. When ommitted, the alue will be returned
   * as-is, which is always a string. You may cast or convert your input here so that it will be available already
   * parsed when it's needed.
   *
   * @param value The string arg that was passed
   * @param options Any already-parsed options in the current context. The order is not guaranteed, so some args will
   * not necessarily be parsed before this one.
   */
  parse?(value: string, options: Options & OptionsBase): Value
}

export interface CommandDef<T> extends Named {
  /**
   * Command name. When using in CLI, you will use `name` without any prefixes, unlike options.
   * Also, the first command that was parsed will run, and the others will be skipped.
   */
  name: string

  /** In addition to primary name, you may also define aliases. */
  aliases?: string[]

  /** Description of command to display in help text. */
  description?: string

  /**
   * This is the function that runs this command.
   *
   * @param options All the parsed options (or defaults) that were passed in the CLI will be available here.
   */
  run(options: T & OptionsBase): void
}

export interface HelpDef {
  /**
   * Desired width to accommodate to when outputting help to the shell.
   * Descriptions that are longer than this value will be wrapped into the next line.
   *
   * Default: `80`. Use `0` to disable wrapping. */
  printWidth?: number

  /**
   * The name of your application binary. Massarg attempts to infer this using the args, but you may override this
   * if you don't like the inferred value.
   */
  binName?: string

  /**
   * A single color or array of colors to use on normal text (descriptions, usage example, etc.)
   *
   * The colors are passed to `chalk`, so you can use any color `chalk` supports, including foreground and
   * background colors.
   *
   * **Please note** that combining colors may break wrapping, so please test your help output before releasing.
   *
   * Defaults to `"dim"`
   */
  normalColors?: ArrayOr<keyof typeof chalk>

  /**
   * A single color or array of colors to use on highlighted text (command names, option names, binary name, etc)
   *
   * The colors are passed to `chalk`, so you can use any color `chalk` supports, including foreground and
   * background colors.
   *
   * **Please note** that combining colors may break wrapping, so please test your help output before releasing.
   *
   * Defaults to `"yellow"`
   */
  highlightColors?: ArrayOr<keyof typeof chalk>

  /**
   * A single color or array of colors to use on title text ("Options", "Usage", etc)
   *
   * The colors are passed to `chalk`, so you can use any color `chalk` supports, including foreground and
   * background colors.
   *
   * **Please note** that combining colors may break wrapping, so please test your help output before releasing.
   *
   * Defaults to `"white"`
   */
  titleColors?: ArrayOr<keyof typeof chalk>

  /**
   * A single color or array of colors to use on subtitle text (e.g. command titles for non-gloal options)
   *
   * The colors are passed to `chalk`, so you can use any color `chalk` supports, including foreground and
   * background colors.
   *
   * **Please note** that combining colors may break wrapping, so please test your help output before releasing.
   *
   * Defaults to `["bold", "dim"]`
   */
  subtitleColors?: ArrayOr<keyof typeof chalk>

  /**
   * A single color or array of colors to use on body text (e.g. header and footer)
   *
   * The colors are passed to `chalk`, so you can use any color `chalk` supports, including foreground and
   * background colors.
   *
   * **Please note** that combining colors may break wrapping, so please test your help output before releasing.
   *
   * Defaults to `["white"]`
   */
  bodyColors?: ArrayOr<keyof typeof chalk>

  /**
   * Additional content to display below the usage line, and above the rest.
   */
  header?: string

  /**
   * Additional content to display below the commands and options, at the very bottom.
   */
  footer?: string

  /**
   * Separator for command name & its aliases.
   *
   * Defaults to `" | "`, e.g. for command `"my-cmd"` with aliases `["m", "c"]`, the ourput will be:
   *
   * ```
   * my-cmd | m | c
   * ```
   */
  commandNameSeparator?: string

  /**
   * Separator for option name & its aliases.
   *
   * Defaults to `"|"`, e.g. for option `"my-bool"` with aliases `["m", "b"]`, the ourput will be:
   *
   * ```
   * --my-bool|m|b
   * ```
   */
  optionNameSeparator?: string

  /**
   * When `true`, all the command and option names' and descritions' columns will align with each other.
   * When `false`, they will all be aligned only within their own category. This can save you white-space when
   * you have some long-named options or commands that cause all others to have too much.
   *
   * Defaults to `false`.
   */
  useGlobalColumns?: boolean

  /**
   * Text to be shown next to the binary name, on the Usage line.
   *
   * Defaults to `"[command] [options]"`, which outputs:
   *
   * ```
   * my-bin [comman] [options]
   * ```
   */
  usageExample?: string

  /**
   * When disabled, all colors in the output will be disabled.
   */
  useColors?: boolean

  /**
   * When disabled, the default values will not be appended to the help text of each option.
   */
  includeDefaults?: boolean

  /**
   * The prefix at the start of the line when presenting examples, at the input (top) line.
   */
  exampleInputPrefix?: string

  /**
   * The prefix at the start of the line when presenting examples, at the output (bottom) line.
   */
  exampleOutputPrefix?: string
}

export interface ExampleDef {
  /** The input line - to show examples of parameters, commands, etc */
  input: string

  /** The output line - to show the output of whatever `input` is regarding. */
  output?: string

  /** An optional description which will be used as a title. */
  description?: string
}
