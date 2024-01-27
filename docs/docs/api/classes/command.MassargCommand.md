---
id: "command.MassargCommand"
title: "Class: MassargCommand<Args>"
sidebar_label: "MassargCommand"
custom_edit_url: null
---

[command](../modules/command.md).MassargCommand

A command is a named function that can be invoked with a set of options.

Commands can have sub-commands, which can have their own sub-commands, and so on.

Options are not inherited by sub-commands, but their parsed values are passed down when
invoking a sub-command. This works recursively.

**`Example`**

```ts
massarg(options).command({
  name: 'foo',
  description: 'foo command',
  run: (options, instance) => {
    console.log(options, instance)
  },
})
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `Args` | extends [`ArgsObject`](../modules/command.md#argsobject) = [`ArgsObject`](../modules/command.md#argsobject) |

## Hierarchy

- **`MassargCommand`**

  ↳ [`MassargHelpCommand`](command.MassargHelpCommand.md)

  ↳ [`Massarg`](massarg.Massarg.md)

## Implements

- `Omit`\<[`CommandConfig`](../modules/command.md#commandconfig-1)\<`Args`\>, ``"run"``\>

## Constructors

### constructor

• **new MassargCommand**\<`Args`\>(`options`, `parent?`): [`MassargCommand`](command.MassargCommand.md)\<`Args`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Args` | extends [`ArgsObject`](../modules/command.md#argsobject) = [`ArgsObject`](../modules/command.md#argsobject) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.name` | `string` | Command name |
| `options.description` | `string` | Command description, displayed in the help output |
| `options.run` | [`Runner`](../modules/command.md#runner)\<`Args`\> | Function used when invoking this command. It receives the parsed options and the primary instance of Massarg used to invoke this command (the top-level instance) |
| `options.aliases?` | `string`[] | Command aliases |
| `options.optionPrefix?` | `string` | The prefix to match before option names, e.g. `--` |
| `options.aliasPrefix?` | `string` | The prefix to match before option aliases, e.g. `-` |
| `parent?` | [`MassargCommand`](command.MassargCommand.md)\<`any`\> | - |

#### Returns

[`MassargCommand`](command.MassargCommand.md)\<`Args`\>

#### Defined in

[src/command.ts:86](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L86)

## Properties

### name

• **name**: `string`

#### Implementation of

Omit.name

#### Defined in

[src/command.ts:73](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L73)

___

### description

• **description**: `string`

#### Implementation of

Omit.description

#### Defined in

[src/command.ts:74](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L74)

___

### aliases

• **aliases**: `string`[]

#### Implementation of

Omit.aliases

#### Defined in

[src/command.ts:75](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L75)

___

### commands

• **commands**: [`MassargCommand`](command.MassargCommand.md)\<`any`\>[] = `[]`

#### Defined in

[src/command.ts:77](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L77)

___

### options

• **options**: [`MassargOption`](option.MassargOption.md)\<`unknown`, [`ArgsObject`](../modules/command.md#argsobject)\>[] = `[]`

#### Defined in

[src/command.ts:78](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L78)

___

### examples

• **examples**: [`MassargExample`](example.MassargExample.md)[] = `[]`

#### Defined in

[src/command.ts:79](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L79)

___

### args

• **args**: `Partial`\<`Args`\> = `{}`

#### Defined in

[src/command.ts:80](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L80)

___

### parent

• `Optional` **parent**: [`MassargCommand`](command.MassargCommand.md)\<`any`\>

#### Defined in

[src/command.ts:82](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L82)

___

### optionPrefix

• **optionPrefix**: `string` = `DEFAULT_OPT_FULL_PREFIX`

#### Implementation of

Omit.optionPrefix

#### Defined in

[src/command.ts:83](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L83)

___

### aliasPrefix

• **aliasPrefix**: `string` = `DEFAULT_OPT_SHORT_PREFIX`

#### Implementation of

Omit.aliasPrefix

#### Defined in

[src/command.ts:84](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L84)

## Accessors

### optionPrefixes

• `get` **optionPrefixes**(): [`Prefixes`](../modules/option.md#prefixes)

#### Returns

[`Prefixes`](../modules/option.md#prefixes)

#### Defined in

[src/command.ts:99](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L99)

___

### helpConfig

• `get` **helpConfig**(): [`DeepRequired`](../modules/utils.md#deeprequired)\<\{ `bindCommand?`: `boolean` ; `bindOption?`: `boolean` ; `useGlobalTableColumns?`: `boolean` ; `commandOptions?`: \{ `compact?`: `boolean` ; `nameStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `descriptionStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `namePrefix?`: `string` ; `aliasPrefix?`: `string`  } ; `optionOptions?`: \{ `compact?`: `boolean` ; `nameStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `descriptionStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `namePrefix?`: `string` ; `aliasPrefix?`: `string` ; `displayNegations?`: `boolean`  } ; `titleStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `descriptionStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `subtitleStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `usageStyle?`: \{ `prefix?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `main?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `command?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `options?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  }  } ; `headerStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `footerStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `lineLength?`: `number` ; `exampleOptions?`: \{ `descriptionStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `inputStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `outputStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `inputPrefix?`: `string` ; `outputPrefix?`: `string` ; `prefixStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `compact?`: `boolean`  } ; `usageText?`: `string` ; `headerText?`: `string` ; `footerText?`: `string`  }\>

#### Returns

[`DeepRequired`](../modules/utils.md#deeprequired)\<\{ `bindCommand?`: `boolean` ; `bindOption?`: `boolean` ; `useGlobalTableColumns?`: `boolean` ; `commandOptions?`: \{ `compact?`: `boolean` ; `nameStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `descriptionStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `namePrefix?`: `string` ; `aliasPrefix?`: `string`  } ; `optionOptions?`: \{ `compact?`: `boolean` ; `nameStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `descriptionStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `namePrefix?`: `string` ; `aliasPrefix?`: `string` ; `displayNegations?`: `boolean`  } ; `titleStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `descriptionStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `subtitleStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `usageStyle?`: \{ `prefix?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `main?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `command?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `options?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  }  } ; `headerStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `footerStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `lineLength?`: `number` ; `exampleOptions?`: \{ `descriptionStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `inputStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `outputStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `inputPrefix?`: `string` ; `outputPrefix?`: `string` ; `prefixStyle?`: \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  } ; `compact?`: `boolean`  } ; `usageText?`: `string` ; `headerText?`: `string` ; `footerText?`: `string`  }\>

#### Defined in

[src/command.ts:106](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L106)

## Methods

### command

▸ **command**\<`A`\>(`config`): [`MassargCommand`](command.MassargCommand.md)\<`Args` & `A`\>

Add a sub-command to this command.

The sub-command will inherit all help configuration from the parent commands,
all the way up to the top-level command.

While options are not inherited, they will be passed from any parent commands
to the sub-command when invoked.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends [`ArgsObject`](../modules/command.md#argsobject) = `Args` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Object` | - |
| `config.name` | `string` | Command name |
| `config.description` | `string` | Command description, displayed in the help output |
| `config.run` | [`Runner`](../modules/command.md#runner)\<`A`\> | Function used when invoking this command. It receives the parsed options and the primary instance of Massarg used to invoke this command (the top-level instance) |
| `config.aliases?` | `string`[] | Command aliases |
| `config.optionPrefix?` | `string` | The prefix to match before option names, e.g. `--` |
| `config.aliasPrefix?` | `string` | The prefix to match before option aliases, e.g. `-` |

#### Returns

[`MassargCommand`](command.MassargCommand.md)\<`Args` & `A`\>

#### Defined in

[src/command.ts:133](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L133)

▸ **command**\<`A`\>(`config`): [`MassargCommand`](command.MassargCommand.md)\<`Args` & `A`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends [`ArgsObject`](../modules/command.md#argsobject) = `Args` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`MassargCommand`](command.MassargCommand.md)\<`A`\> |

#### Returns

[`MassargCommand`](command.MassargCommand.md)\<`Args` & `A`\>

#### Defined in

[src/command.ts:134](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L134)

___

### flag

▸ **flag**(`config`): [`MassargCommand`](command.MassargCommand.md)\<`Args`\>

Adds a flag to this command.

A flag is an option that is either present or not. It can be used to toggle
a boolean value, or to indicate that a command should be run in a different
mode.

A flag can be negated by prefixing it with `no-`. For example, `--no-verbose`,
or by prefixing the alias with `^` instead of `-`. This is configurable via the command's
configuration.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Object` | - |
| `config.name` | `string` | Name of the option |
| `config.description` | `string` | Description of the option, displayed in the help output |
| `config.aliases` | `string`[] | Aliases for the option, which can be used with the shorthand option notation. |
| `config.negationName?` | `string` | Negation name of the option, which can be used with the full option notation, e.g. `loud` for `--loud`. Defaults to `no-{name}`, e.g. `--no-quiet`. |
| `config.defaultValue?` | `any` | Default value of the option |
| `config.negationAliases?` | `string`[] | Negation aliases for the option, which can be used with the shorthand option notation, e.g. `Q` for `-Q`. Defaults to uppercase of each of the aliases provided. |
| `config.array?` | `boolean` | Whether the option is an array. Array options can be specified multiple times, and the values will be collected into an array. Normally, specifying an option multiple times will override the previous value. |
| `config.required?` | `boolean` | Whether the option is required. If it is required, parsing will throw an error if it's not present. |
| `config.hidden?` | `boolean` | Whether the option is hidden. Hidden options are not displayed in the help output. |
| `config.outputName?` | `string` | Specify a custom name for the output, which will be used when parsing the args. |
| `config.negatable?` | `boolean` | Whether the flag can be negated, e.g. `--no-verbose` |

#### Returns

[`MassargCommand`](command.MassargCommand.md)\<`Args`\>

#### Defined in

[src/command.ts:175](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L175)

▸ **flag**(`config`): [`MassargCommand`](command.MassargCommand.md)\<`Args`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`MassargFlag`](option.MassargFlag.md) |

#### Returns

[`MassargCommand`](command.MassargCommand.md)\<`Args`\>

#### Defined in

[src/command.ts:176](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L176)

___

### option

▸ **option**\<`T`, `A`\>(`config`): [`MassargCommand`](command.MassargCommand.md)\<`Args`\>

Adds an option to this command.

An option is a named value that can be passed to a command. It can be
required or optional, and can be of any type.

You can specify a default value for an option, which will be used if the
option is not passed to the command.

You can also specify a parse function, which will be used to parse the
value passed to the command. This is useful if you want to parse a string
into a more complex type, or if you want to validate the value.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `string` |
| `A` | extends [`ArgsObject`](../modules/command.md#argsobject) = `Args` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`MassargOption`](option.MassargOption.md)\<`T`, `A`\> |

#### Returns

[`MassargCommand`](command.MassargCommand.md)\<`Args`\>

#### Defined in

[src/command.ts:209](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L209)

▸ **option**\<`T`, `A`\>(`config`): [`MassargCommand`](command.MassargCommand.md)\<`Args`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `string` |
| `A` | extends [`ArgsObject`](../modules/command.md#argsobject) = `Args` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Object` | - |
| `config.name` | `string` | Name of the option |
| `config.description` | `string` | Description of the option, displayed in the help output |
| `config.aliases` | `string`[] | Aliases for the option, which can be used with the shorthand option notation. |
| `config.negationName?` | `string` | Negation name of the option, which can be used with the full option notation, e.g. `loud` for `--loud`. Defaults to `no-{name}`, e.g. `--no-quiet`. |
| `config.defaultValue?` | `any` | Default value of the option |
| `config.negationAliases?` | `string`[] | Negation aliases for the option, which can be used with the shorthand option notation, e.g. `Q` for `-Q`. Defaults to uppercase of each of the aliases provided. |
| `config.array?` | `boolean` | Whether the option is an array. Array options can be specified multiple times, and the values will be collected into an array. Normally, specifying an option multiple times will override the previous value. |
| `config.required?` | `boolean` | Whether the option is required. If it is required, parsing will throw an error if it's not present. |
| `config.isDefault?` | `boolean` | Whether the option is the default option. The default option is the option that is used if no other option is specified, e.g. a value is passed in without an option name. Note that if commands match the same argument first, they will be used instead of the default option. |
| `config.hidden?` | `boolean` | Whether the option is hidden. Hidden options are not displayed in the help output. |
| `config.outputName?` | `string` | Specify a custom name for the output, which will be used when parsing the args. |
| `config.parse?` | [`Parser`](../modules/option.md#parser)\<`A`, `T`\> | Parse the value of the option. You can return any type here, or throw an error if the value is invalid. |
| `config.type?` | ``"number"`` | - |

#### Returns

[`MassargCommand`](command.MassargCommand.md)\<`Args`\>

#### Defined in

[src/command.ts:210](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L210)

___

### example

▸ **example**(`config`): [`MassargCommand`](command.MassargCommand.md)\<`Args`\>

Adds an example to this command.

An example is a description of how to use the command, with an example input and output.

At least one of `description`, `input` or `output` must be provided, but neither alone is
required.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Object` | - |
| `config.description?` | `string` | Description of the example. This will appear as a title above the input/output line(s). |
| `config.input?` | `string` | Input of the example. This will appear as a line below the description, with a `$` prefix. The prefix can be changed using the `help()` function on the command. |
| `config.output?` | `string` | Output of the example. This will appear as a line below the input, with a `>` prefix. The prefix can be changed using the `help()` function on the command. |

#### Returns

[`MassargCommand`](command.MassargCommand.md)\<`Args`\>

#### Defined in

[src/command.ts:286](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L286)

___

### help

▸ **help**(`config`): [`MassargCommand`](command.MassargCommand.md)\<`Args`\>

Configure the help output for this (and all child) commands.

You can automatically bind the help command to this command, and/or bind the help option
to this command.

If you don't opt-in to this behavior with `bindCommand` or `bindOption`, you can still
access the help output via `this.helpString()` and `this.printHelp()`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Object` | - |
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

[`MassargCommand`](command.MassargCommand.md)\<`Args`\>

#### Defined in

[src/command.ts:300](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L300)

___

### main

▸ **main**(`run`): [`MassargCommand`](command.MassargCommand.md)\<`Args`\>

Configure the main function for this command. This command will run when no sub-commands
are provided.

If none is provided, help will be printed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `run` | [`Runner`](../modules/command.md#runner)\<`Args`\> |

#### Returns

[`MassargCommand`](command.MassargCommand.md)\<`Args`\>

#### Defined in

[src/command.ts:318](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L318)

___

### parse

▸ **parse**(`argv?`, `args?`, `parent?`): `void` \| `Promise`\<`void`\>

Parse the given arguments and run the command or sub-commands along with the given options
and flags.

To parse the arguments without running any commands and only get the output args,
use `getArgs` instead.

#### Parameters

| Name | Type |
| :------ | :------ |
| `argv` | `string`[] |
| `args?` | `Partial`\<`Args`\> |
| `parent?` | [`MassargCommand`](command.MassargCommand.md)\<`Args`\> |

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[src/command.ts:330](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L330)

___

### getArgs

▸ **getArgs**(`argv`, `__args?`, `parent?`, `parseCommands?`): `void` \| `Promise`\<`void`\>

Parse the given arguments and return the output args.

#### Parameters

| Name | Type |
| :------ | :------ |
| `argv` | `string`[] |
| `__args?` | `Partial`\<`Args`\> |
| `parent?` | [`MassargCommand`](command.MassargCommand.md)\<`any`\> |
| `parseCommands?` | ``false`` |

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[src/command.ts:368](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L368)

▸ **getArgs**(`argv`, `__args?`, `parent?`, `parseCommands?`): `Args`

#### Parameters

| Name | Type |
| :------ | :------ |
| `argv` | `string`[] |
| `__args?` | `Partial`\<`Args`\> |
| `parent?` | [`MassargCommand`](command.MassargCommand.md)\<`any`\> |
| `parseCommands?` | ``true`` |

#### Returns

`Args`

#### Defined in

[src/command.ts:374](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L374)

___

### helpString

▸ **helpString**(): `string`

Generate the help output for this command, and return it as a string.

#### Returns

`string`

#### Defined in

[src/command.ts:478](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L478)

___

### printHelp

▸ **printHelp**(): `void`

Print the help output for this command.

#### Returns

`void`

#### Defined in

[src/command.ts:485](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L485)
