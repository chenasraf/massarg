# massarg

Flexible, powerful, and simple command/argument parser for JS applications.

Yes, there are a lot of arg parsers. But hear us out.

## Features

- Primary command to be run without args
- Commands to be run from arg
- Options with flexible parsing
- Automatically generated help text:
  - Customizable colors
  - Customizable header and footer text
  - Customizable usage examples
  - Automatic text alignment
  - Add run examples for your args
- TypeScript-first package: You will always have types

## Usage

### Importing

```typescript
import massarg from "massarg" // import init function (returns massarg instance)
import { Massarg } from "massarg" // import class
```

### Initializing

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

### Main command

The main command is the one that runs when you supply no other commands.

#### Example

##### JS/TS

```typescript
massarg().main((options) => {
  console.log("Parsed options:", options)
  // do stuff
})
```

##### Shell

```shell
$ ./mybin
# Main command runs without options

$ ./mybin --my-string "Some string"
# Main command runs with option { myString: "Some string" }
```

### Commands

Commands are activated when their keyword is included in the args. The first command that matches
will be executed, skipping the rest. Options will still be parsed.

#### Example

##### JS/TS

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

###### Options

| Name        | Type                        | Required | Example                                           | Description                                                                                                          |
| ----------- | --------------------------- | -------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| name        | `string`                    | ✅       | `"my-command"`                                    | The name of the command, which will be used in the CLI to trigger it                                                 |
| aliases     | `string[]`                  | ❎       | `["m", "mc"]`                                     | Alternate names for the command, available for use in addition to `name`                                             |
| description | `string`                    | ❎       | `"Description of the command"`                    | Description for the command, only displayed with `--help` or `printHelp()`                                           |
| run         | `function(options) => void` | ✅       | `(options) => console.log("my-command", options)` | Main function that runs this command. The supplied argument is the options passed via the CLI and parsed by massarg. |

##### Shell

```shell
$ ./mybin my-command
# Specified "my-command" runs without options

$ ./mybin my-command --my-string "Some string"
# Specified "my-command" runs with option { myString: "Some string" }
```

### Options

Options are variables you can accept via CLI and parse to use in your commands, e.g. `--my-bool`,
`--my-string string`, `--my-number 1`

#### Example

##### JS/TS

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

###### Options

| Name        | Type                              | Required | Default  | Example                               | Description                                                                                                                                                                                                |
| ----------- | --------------------------------- | -------- | -------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name        | `string`                          | ✅       |          | `"my-number"`                         | The name of the option, which will be used in the CLI to apply it                                                                                                                                          |
| aliases     | `string[]`                        | ❎       |          | `["n"]`                               | Alternate names for the option, available for use in addition to `name`                                                                                                                                    |
| description | `string`                          | ❎       |          | `"Description of the command"`        | Description for the command, only displayed with `--help` or `printHelp()`                                                                                                                                 |
| parse       | `function(value, options) => any` | ❎       | `String` | `(value, options) => parseInt(value)` | Function that parses this option. The supplied arguments are the string value from the arg, and other options passed via the CLI and parsed by massarg before this one. Not all options will be available. |

##### Shell

```shell
$ ./mybin my-command
# Specified "my-command" runs without options

$ ./mybin my-command --my-string "Some string" --my-number 1 --my-bool
# Specified "my-command" runs with option { myString: "Some string", myNumber: 1, myBool: true }
```

### Help/Usage Command

You can modify some of the styles and behavior of the help text. None of the options are required,
you may override their defaults to modify the behavior.

#### Example

##### JS/TS

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
  useGlobalColumns: false,
  usageExample: "[command] [option]",
})
```

###### Options

| Name                   | Type                 | Default                | Description                                                                                                   |
| ---------------------- | -------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| `binName`              | `string`             | running script name    | The name of the binary, to be used when outputting usage information.                                         |
| `printWidth`           | `number`             | `80`                   | The amount of characters to allow per line. Use `0` to disable wrapping.                                      |
| `normalColors`         | `string \| string[]` | `"dim"`                | Colors to use on normal text (descriptions, usage example, etc.)                                              |
| `highlightColors`      | `string \| string[]` | `"yellow"`             | Colors to use on highlighted text (command names, option names, binary name, etc)                             |
| `titleColors`          | `string \| string[]` | `"white"`              | Colors to use on title text ("Options", "Usage", etc)                                                         |
| `subtitleColors`       | `string \| string[]` | `["bold", "dim"]`      | Colors to use on subtitle text (e.g. command titles for non-gloal options)                                    |
| `header`               | `string`             | `"Header text"`        | Additional content to display below the usage line, and above the rest.                                       |
| `footer`               | `string`             | `"Footer text"`        | Additional content to display below the commands and options, at the very bottom.                             |
| `commandNameSeparator` | `string`             | `" \| "`               | Separator for command name & its aliases.                                                                     |
| `optionNameSeparator`  | `string`             | `"\|"`                 | Separator for option name & its aliases.                                                                      |
| `useGlobalColumns`     | `boolean`            | `false`                | Decides whether to align the columns of the option/command names and their descriptions globally or per table |
| `usageExample`         | `string`             | `"[command] [option]"` | Default text to use as suffix for the `binName`, which will be used in the "Usage" line of the help text      |

##### Shell

```shell
$ ./mybin --help

Usage: my-cmd command [options]

This is the app description

Commands:
  do-something | do | d         This command does something.
  my-custom-command | cc | c    This is another command that does something. It's a
                                different one just to see more available. This description is
                                just to fill more lines.

Command Options:

do-something:
  --bool|-b                     This is a boolean arg. Supply it without value to set as
                                true, or set value 0 for false
  --number|-n                   This is a number arg, if you include this option, you must
                                supply it with a value.

my-custom-command:
  --bool|-b                     This is a boolean arg. Supply it without value or with 1 to
                                set as true, or set value 0 for false
Global Options:

  --help|-h                     Display help information
```
