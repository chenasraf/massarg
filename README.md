# massarg

Massarg is a beautiful, flexible, powerful, and simple-to-use command/argument parser for JS
applications, allowing you to create complex but easy applications that consume command-line
arguments and commands.

Yes, there are a lot of arg parsers. But hear us out.

## Features

- Primary command to be run without args
- Commands to be run from arg
- Options with flexible parsing
- Required options
- Options with multiple values
- Nameless options
- Automatically generated help text:
  - Customizable colors
  - Customizable header and footer text
  - Customizable usage examples
  - Automatic text alignment
  - Add run examples for your args
  - Shows default value and type next to description
- TypeScript-first package: You will always have strong types

## Usage

## Importing

```typescript
import massarg from "massarg" // import init function (returns massarg instance)
import { Massarg } from "massarg" // import class
```

## Initializing

Call the default export function `massarg`, or create a new instance manually using `new Massarg()`,
and then you can start chaining commands. Use `.parse()` to do the final parsing and run the
commands and options.

```typescript
massarg()
  .option(...)
  .command(...)
  .help(...)
  .main(...)
  .parse()
```

## Quick Start

Here is an example with some commonly used examples to get you started. Keep reading for a complete
documentation of every option.

```typescript
massarg()
  .main((options) => console.log("main command", options))
  .command({
    name: "sub",
    description: "a sub command",
    aliases: ["s"],
    run: (options) => console.log("sub command", options),
  })
  .option({
    name: "flag",
    description: "a flag that will be related to any command (main or sub)",
    aliases: ["f"],
    boolean: true,
  })
  .option({
    name: "command-specific-flag",
    description: "a flag that will be related to only the 'sub' command",
    commands: ["sub"],
    parse: (v) => parseInt(v),
  })
  .help({
    binName: "my-cli-app",
    footer: "Copyright © 2021 Me, Myself and I",
  })
```

## Main command

The main command is the one that runs when you supply no other commands.

### Example

#### JS/TS

```typescript
massarg().main((options) => {
  console.log("Parsed options:", options)
  // do stuff
})
```

#### Shell

```shell
$ ./mybin
# Main command runs without options

$ ./mybin --my-string "Some string"
# Main command runs with option { myString: "Some string" }
```

## Commands

Commands are activated when their keyword is included in the args. The first command that matches
will be executed, skipping the rest. Options will still be parsed.

Any arguments that are not taken by options or commands, are automatically passed to
`options.extra`, which you can access when running a command or when using the return value from
`parseArgs()`.

#### Options

| Name          | Type                        | Required | Example                                           | Description                                                                                                          |
| ------------- | --------------------------- | -------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `name`        | `string`                    | ✅       | `"my-command"`                                    | The name of the command, which will be used in the CLI to trigger it                                                 |
| `aliases`     | `string[]`                  |          | `["m", "mc"]`                                     | Alternate names for the command, available for use in addition to `name`                                             |
| `description` | `string`                    |          | `"Description of the command"`                    | Description for the command, only displayed with `--help` or `printHelp()`                                           |
| `run`         | `function(options) => void` | ✅       | `(options) => console.log("my-command", options)` | Main function that runs this command. The supplied argument is the options passed via the CLI and parsed by massarg. |

### Example

#### JS/TS

```typescript
massarg().command({
  name: "do-something",
  description: "This command does something",
  aliases: ["do", "d"],
  run: (options) => {
    console.log("Parsed options:", options)
    // do stuff
  },
})
```

#### Shell

```shell
$ ./mybin my-command
# Specified "my-command" runs without options

$ ./mybin my-command --my-string "Some string"
# Specified "my-command" runs with option { myString: "Some string" }
```

## Options

Options are variables you can accept via CLI and parse to use in your commands, e.g. `--my-bool`,
`--my-string string`, `--my-number 1`

Any arguments that are not taken by options or commands, are automatically passed to
`options.extra`, which you can access when running a command or when using the return value from
`parseArgs()`.

#### Options

| Name          | Type                              | Required | Default  | Example                               | Description                                                                                                                                                                                                      |
| ------------- | --------------------------------- | -------- | -------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`        | `string`                          | ✅       |          | `"my-number"`                         | The name of the option, which will be used in the CLI to apply it                                                                                                                                                |
| `aliases`     | `string[]`                        |          |          | `["n"]`                               | Alternate names for the option, available for use in addition to `name`                                                                                                                                          |
| `description` | `string`                          |          |          | `"Description of the command"`        | Description for the command, only displayed with `--help` or `printHelp()`                                                                                                                                       |
| `parse`       | `function(value, options) => any` |          | `String` | `(value, options) => parseInt(value)` | Function that parses this option. The supplied arguments are the string value from the arg, and other options passed via the CLI and parsed by massarg before this one. Not all options will be available.       |
| `default`     | `boolean`                         |          | `false`  |                                       | When `true`, any args placed without name will be applied to this option. When more than one arg is supplied this way, only the last given will be used (unless the option is an array type).                    |
| `boolean`     | `boolean`                         |          | `false`  |                                       | When set to `true`, this option will be treated as a boolean: will accept no value as `true`, or other truthy values as `true`, and the rest as `false`                                                          |
| `array`       | `boolean`                         |          | `false`  |                                       | When set to true, you will be able to take multiple values when using the same option more than once. They will all be parsed properly and put into an array.                                                    |
| `required`    | `boolean`                         |          | `false`  |                                       | When an option is required, parsing will throw a `RequiredError` if it was not given a proper value. If it is attached to a specific (or several) commands, it will only throw if the relevant command was used. |

### Example

#### JS/TS

```typescript
massarg()
  .option({
    name: "bool",
    aliases: ["b"],
    defaultValue: false,
    commands: ["my-command"],
    description: "This is a boolean arg. Supply it without value or with 1 to set as true, or set value 0 for false",
    parse: Boolean,
  })
  .option({
    name: "number",
    aliases: ["n"],
    description: "This is a number arg, if you include this option, you must supply it with a numeric value.",
    defaultValue: 0,
    commands: "do",
    parse: (v) => parseInt(v),
  })
```

#### Shell

```shell
$ ./mybin my-command
# Specified "my-command" runs without options

$ ./mybin my-command --my-string "Some string" --my-number 1 --my-bool
# Specified "my-command" runs with option { myString: "Some string", myNumber: 1, myBool: true }
```

## Example Lines

Example lines are annotated samples you can add to your help text. They will be added at the end,
above the footer.

The examples consist of inputs, outputs, and optional descriptions. The descriptions are displayed
atop as titles, if specified.

#### Options

| Name          | Type     | Required | Default | Example                                                           | Description                                                                                                                                            |
| ------------- | -------- | -------- | ------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `input`       | `string` | ✅       |         | `"my-cmd --number 10"`                                            | The input line, an example of user input that will be displayed as "shell" commands. The prefix is customizable through the `help()` options.          |
| `output`      | `string` | ✅       |         | `"you entered my-cmd with the number 10, which is larger than 5"` | The output line, an example of the command's output that will be displayed as "shell" output. The prefix is customizable through the `help()` options. |
| `description` | `string` |          |         | `"Run the my-cmd command with a number parameter"`                | An explanation of the input/output that will be display as a title above the input if specified.                                                       |

### Example

#### JS/TS

```typescript
massarg().example({
  input: "my-cmd --number 10",
  output: "you entered my-cmd with the number 10, which is larger than 5",
  description: "Run the my-cmd command with a number parameter",
})
```

## Help/Usage Command

You can modify some of the styles and behavior of the help text. None of the options are required,
you may override their defaults to modify the behavior.

#### Options

| Name                   | Type                 | Default                | Description                                                                                                   |
| ---------------------- | -------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| `binName`              | `string`             | running script name    | The name of the binary, to be used when outputting usage information.                                         |
| `printWidth`           | `number`             | `80`                   | The amount of characters to allow per line. Use `0` to disable wrapping.                                      |
| `normalColors`         | `string \| string[]` | `"dim"`                | Colors to use on normal text (descriptions, usage example, etc.)                                              |
| `highlightColors`      | `string \| string[]` | `"yellow"`             | Colors to use on highlighted text (command names, option names, binary name, etc)                             |
| `titleColors`          | `string \| string[]` | `["bold", "white"]`    | Colors to use on title text ("Options", "Usage", etc)                                                         |
| `subtitleColors`       | `string \| string[]` | `["bold", "dim"]`      | Colors to use on subtitle text (e.g. command titles for non-gloal options)                                    |
| `bodyColors`           | `string \| string[]` | `"white"`              | Colors to use on special body text (header, footer, and default value)                                        |
| `header`               | `string`             |                        | Additional content to display below the usage line, and above the rest.                                       |
| `footer`               | `string`             |                        | Additional content to display below the commands and options, at the very bottom.                             |
| `commandNameSeparator` | `string`             | `" \| "`               | Separator for command name & its aliases.                                                                     |
| `optionNameSeparator`  | `string`             | `"\|"`                 | Separator for option name & its aliases.                                                                      |
| `useGlobalColumns`     | `boolean`            | `true`                 | Decides whether to align the columns of the option/command names and their descriptions globally or per table |
| `usageExample`         | `string`             | `"[command] [option]"` | Default text to use as suffix for the `binName`, which will be used in the "Usage" line of the help text      |
| `useColors`            | `boolean`            | `true`                 | When false, no colors will be output in the help. Good for non-supporting systems.                            |
| `includeDefaults`      | `boolean`            | `true`                 | When false, the default values will not be specified after the description of each option.                    |

### Example

#### JS/TS

```typescript
massarg().help({
  printWidth: 80,
  binName: "my-app",
  normalColors: "dim",
  highlightColors: "yellow",
  titleColors: "white",
  subtitleColors: ["bold", "dim"],
  header: "Header text",
  footer: "Footer text",
  commandNameSeparator: " | ",
  optionNameSeparator: "|",
  useGlobalColumns: true,
  usageExample: "command [option]",
})
```

#### Shell output

![colored shell output](https://user-images.githubusercontent.com/167217/126086652-433a523f-2f0a-427c-b58a-18b2131489f4.png)
