---
id: "HelpGenerator"
title: "Class: HelpGenerator"
sidebar_label: "HelpGenerator"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new HelpGenerator**(`entry`, `config?`): [`HelpGenerator`](HelpGenerator.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entry` | [`MassargCommand`](MassargCommand.md)\<`any`\> | - |
| `config?` | `Object` | - |
| `config.bindCommand?` | `boolean` | Whether to bind the help command to this command Set this to `true` to automatically add a `help` command to this command's subcommands. |
| `config.bindOption?` | `boolean` | Whether to bind the help option to this command Set this to `true` to automatically add a `--help` option to this command's options. |
| `config.useGlobalTableColumns?` | `boolean` | Whether to align all tables to the column widths, or have each table be independent. Default is `true` |
| `config.commandOptions?` | `Object` | Options for generating the table of commands |
| `config.commandOptions.compact?` | `boolean` | When `false`, each row is separated by a blank line |
| `config.commandOptions.nameStyle?` | `Object` | Style of the command/option name |
| `config.commandOptions.nameStyle.bold?` | `boolean` | - |
| `config.commandOptions.nameStyle.underline?` | `boolean` | - |
| `config.commandOptions.nameStyle.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.commandOptions.nameStyle.reset?` | `boolean` | - |
| `config.commandOptions.descriptionStyle?` | `Object` | Style of the command/option description |
| `config.commandOptions.descriptionStyle.bold?` | `boolean` | - |
| `config.commandOptions.descriptionStyle.underline?` | `boolean` | - |
| `config.commandOptions.descriptionStyle.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.commandOptions.descriptionStyle.reset?` | `boolean` | - |
| `config.commandOptions.namePrefix?` | `string` | Prefix for the command/option name (default is the command's prefix) |
| `config.commandOptions.aliasPrefix?` | `string` | Prefix for the command/option aliases (default is the command's prefix) |
| `config.optionOptions?` | `Object` | Options for generating the table of options |
| `config.optionOptions.compact?` | `boolean` | When `false`, each row is separated by a blank line |
| `config.optionOptions.nameStyle?` | `Object` | Style of the command/option name |
| `config.optionOptions.nameStyle.bold?` | `boolean` | - |
| `config.optionOptions.nameStyle.underline?` | `boolean` | - |
| `config.optionOptions.nameStyle.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.optionOptions.nameStyle.reset?` | `boolean` | - |
| `config.optionOptions.descriptionStyle?` | `Object` | Style of the command/option description |
| `config.optionOptions.descriptionStyle.bold?` | `boolean` | - |
| `config.optionOptions.descriptionStyle.underline?` | `boolean` | - |
| `config.optionOptions.descriptionStyle.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.optionOptions.descriptionStyle.reset?` | `boolean` | - |
| `config.optionOptions.namePrefix?` | `string` | Prefix for the command/option name (default is the command's prefix) |
| `config.optionOptions.aliasPrefix?` | `string` | Prefix for the command/option aliases (default is the command's prefix) |
| `config.optionOptions.displayNegations?` | `boolean` | Whether to display negations with each option name |
| `config.titleStyle?` | `Object` | Style of the help title |
| `config.titleStyle.bold?` | `boolean` | - |
| `config.titleStyle.underline?` | `boolean` | - |
| `config.titleStyle.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.titleStyle.reset?` | `boolean` | - |
| `config.descriptionStyle?` | `Object` | Style of the help description |
| `config.descriptionStyle.bold?` | `boolean` | - |
| `config.descriptionStyle.underline?` | `boolean` | - |
| `config.descriptionStyle.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.descriptionStyle.reset?` | `boolean` | - |
| `config.subtitleStyle?` | `Object` | Style of the help subtitles for commands, options and examples |
| `config.subtitleStyle.bold?` | `boolean` | - |
| `config.subtitleStyle.underline?` | `boolean` | - |
| `config.subtitleStyle.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.subtitleStyle.reset?` | `boolean` | - |
| `config.usageStyle?` | `Object` | Style of the help usage |
| `config.usageStyle.prefix?` | `Object` | Style of the help usage title - appears before the usage text (custom or auto) |
| `config.usageStyle.prefix.bold?` | `boolean` | - |
| `config.usageStyle.prefix.underline?` | `boolean` | - |
| `config.usageStyle.prefix.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.usageStyle.prefix.reset?` | `boolean` | - |
| `config.usageStyle.main?` | `Object` | For custom usage text, this is the primary style used (right after the `prefix` style). For automated usage text, this style is used for the command/binary name |
| `config.usageStyle.main.bold?` | `boolean` | - |
| `config.usageStyle.main.underline?` | `boolean` | - |
| `config.usageStyle.main.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.usageStyle.main.reset?` | `boolean` | - |
| `config.usageStyle.command?` | `Object` | Style of the help usage commands (if any) |
| `config.usageStyle.command.bold?` | `boolean` | - |
| `config.usageStyle.command.underline?` | `boolean` | - |
| `config.usageStyle.command.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.usageStyle.command.reset?` | `boolean` | - |
| `config.usageStyle.options?` | `Object` | Style of the help usage options (if any) |
| `config.usageStyle.options.bold?` | `boolean` | - |
| `config.usageStyle.options.underline?` | `boolean` | - |
| `config.usageStyle.options.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.usageStyle.options.reset?` | `boolean` | - |
| `config.headerStyle?` | `Object` | Style of the help header |
| `config.headerStyle.bold?` | `boolean` | - |
| `config.headerStyle.underline?` | `boolean` | - |
| `config.headerStyle.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.headerStyle.reset?` | `boolean` | - |
| `config.footerStyle?` | `Object` | Style of the help footer |
| `config.footerStyle.bold?` | `boolean` | - |
| `config.footerStyle.underline?` | `boolean` | - |
| `config.footerStyle.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.footerStyle.reset?` | `boolean` | - |
| `config.lineLength?` | `number` | Maximum length of a row in the help output |
| `config.exampleOptions?` | `Object` | Options for examples section |
| `config.exampleOptions.descriptionStyle?` | `Object` | Style of the example description |
| `config.exampleOptions.descriptionStyle.bold?` | `boolean` | - |
| `config.exampleOptions.descriptionStyle.underline?` | `boolean` | - |
| `config.exampleOptions.descriptionStyle.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.exampleOptions.descriptionStyle.reset?` | `boolean` | - |
| `config.exampleOptions.inputStyle?` | `Object` | Style of the example input |
| `config.exampleOptions.inputStyle.bold?` | `boolean` | - |
| `config.exampleOptions.inputStyle.underline?` | `boolean` | - |
| `config.exampleOptions.inputStyle.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.exampleOptions.inputStyle.reset?` | `boolean` | - |
| `config.exampleOptions.outputStyle?` | `Object` | Style of the example output |
| `config.exampleOptions.outputStyle.bold?` | `boolean` | - |
| `config.exampleOptions.outputStyle.underline?` | `boolean` | - |
| `config.exampleOptions.outputStyle.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.exampleOptions.outputStyle.reset?` | `boolean` | - |
| `config.exampleOptions.inputPrefix?` | `string` | Prefix for the example input (default: `$`) |
| `config.exampleOptions.outputPrefix?` | `string` | Prefix for the example output (default: `>`) |
| `config.exampleOptions.prefixStyle?` | `Object` | Style of the example input/output prefixes |
| `config.exampleOptions.prefixStyle.bold?` | `boolean` | - |
| `config.exampleOptions.prefixStyle.underline?` | `boolean` | - |
| `config.exampleOptions.prefixStyle.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` | - |
| `config.exampleOptions.prefixStyle.reset?` | `boolean` | - |
| `config.exampleOptions.compact?` | `boolean` | Whether to compact the examples section |
| `config.usageText?` | `string` | Text to display at the very top, describing CLI usage |
| `config.headerText?` | `string` | Text to display above the description, below the usage |
| `config.footerText?` | `string` | Text to display at the very bottom, below the examples |

#### Returns

[`HelpGenerator`](HelpGenerator.md)

#### Defined in

[src/help.ts:197](https://github.com/chenasraf/massarg/blob/48b3e64/src/help.ts#L197)

## Properties

### entry

• **entry**: [`MassargCommand`](MassargCommand.md)\<`any`\>

#### Defined in

[src/help.ts:194](https://github.com/chenasraf/massarg/blob/48b3e64/src/help.ts#L194)

___

### config

• **config**: [`DeepRequired`](../modules.md#deeprequired)\<\{ `bindCommand?`: `boolean` ; `bindOption?`: `boolean` ; `useGlobalTableColumns?`: `boolean` ; `commandOptions?`: \{ `compact?`: `boolean` ; `nameStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `descriptionStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `namePrefix?`: `string` ; `aliasPrefix?`: `string`  } ; `optionOptions?`: \{ `compact?`: `boolean` ; `nameStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `descriptionStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `namePrefix?`: `string` ; `aliasPrefix?`: `string` ; `displayNegations?`: `boolean`  } ; `titleStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `descriptionStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `subtitleStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `usageStyle?`: \{ `prefix?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `main?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `command?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `options?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  }  } ; `headerStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `footerStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `lineLength?`: `number` ; `exampleOptions?`: \{ `descriptionStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `inputStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `outputStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `inputPrefix?`: `string` ; `outputPrefix?`: `string` ; `prefixStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `compact?`: `boolean`  } ; `usageText?`: `string` ; `headerText?`: `string` ; `footerText?`: `string`  }\>

#### Defined in

[src/help.ts:195](https://github.com/chenasraf/massarg/blob/48b3e64/src/help.ts#L195)

## Methods

### generate

▸ **generate**(): `string`

#### Returns

`string`

#### Defined in

[src/help.ts:202](https://github.com/chenasraf/massarg/blob/48b3e64/src/help.ts#L202)

___

### printHelp

▸ **printHelp**(): `void`

#### Returns

`void`

#### Defined in

[src/help.ts:321](https://github.com/chenasraf/massarg/blob/48b3e64/src/help.ts#L321)
