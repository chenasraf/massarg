---
id: "option.MassargOption"
title: "Class: MassargOption<OptionType, Args>"
sidebar_label: "MassargOption"
custom_edit_url: null
---

[option](../modules/option.md).MassargOption

An option that can be passed to a command.

Options can be specified in two ways:

- Using the long form, e.g. `--option value`
- Using the short form, e.g. `-o value`

They can also have a parse function, which will be used to parse the value passed in from the
original argument (string).

**`Example`**

```ts
massarg(options).option({
  name: 'option',
  description: 'An option',
  defaultValue: 'default',
  aliases: ['o'],
  parse: (value) => value.toUpperCase(),
})
```

## Type parameters

| Name | Type |
| :------ | :------ |
| `OptionType` | extends `any` = `unknown` |
| `Args` | extends [`ArgsObject`](../modules/command.md#argsobject-8) = [`ArgsObject`](../modules/command.md#argsobject-8) |

## Hierarchy

- **`MassargOption`**

  ↳ [`MassargNumber`](option.MassargNumber.md)

  ↳ [`MassargFlag`](option.MassargFlag.md)

## Implements

- [`OptionConfig`](../modules/option.md#optionconfig-17)\<`OptionType`, `Args`\>

## Constructors

### constructor

• **new MassargOption**\<`OptionType`, `Args`\>(`options`): [`MassargOption`](option.MassargOption.md)\<`OptionType`, `Args`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `OptionType` | extends `unknown` = `unknown` |
| `Args` | extends [`ArgsObject`](../modules/command.md#argsobject-8) = [`ArgsObject`](../modules/command.md#argsobject-8) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.name` | `string` | Name of the option |
| `options.description` | `string` | Description of the option, displayed in the help output |
| `options.aliases` | `string`[] | Aliases for the option, which can be used with the shorthand option notation. |
| `options.negationName?` | `string` | Negation name of the option, which can be used with the full option notation, e.g. `loud` for `--loud`. Defaults to `no-{name}`, e.g. `--no-quiet`. |
| `options.defaultValue?` | `any` | Default value of the option |
| `options.negationAliases?` | `string`[] | Negation aliases for the option, which can be used with the shorthand option notation, e.g. `Q` for `-Q`. Defaults to uppercase of each of the aliases provided. |
| `options.parse?` | [`Parser`](../modules/option.md#parser-8)\<`Args`, `OptionType`\> | Parse the value of the option. You can return any type here, or throw an error if the value is invalid. |
| `options.array?` | `boolean` | Whether the option is an array. Array options can be specified multiple times, and the values will be collected into an array. Normally, specifying an option multiple times will override the previous value. |
| `options.required?` | `boolean` | Whether the option is required. If it is required, parsing will throw an error if it's not present. |
| `options.isDefault?` | `boolean` | Whether the option is the default option. The default option is the option that is used if no other option is specified, e.g. a value is passed in without an option name. Note that if commands match the same argument first, they will be used instead of the default option. |
| `options.hidden?` | `boolean` | Whether the option is hidden. Hidden options are not displayed in the help output. |
| `options.outputName?` | `string` | Specify a custom name for the output, which will be used when parsing the args. |

#### Returns

[`MassargOption`](option.MassargOption.md)\<`OptionType`, `Args`\>

#### Defined in

[src/option.ts:174](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L174)

## Properties

### name

• **name**: `string`

#### Implementation of

OptionConfig.name

#### Defined in

[src/option.ts:162](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L162)

___

### negationName

• **negationName**: `string`

#### Implementation of

OptionConfig.negationName

#### Defined in

[src/option.ts:163](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L163)

___

### description

• **description**: `string`

#### Implementation of

OptionConfig.description

#### Defined in

[src/option.ts:164](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L164)

___

### defaultValue

• `Optional` **defaultValue**: `OptionType`

#### Implementation of

OptionConfig.defaultValue

#### Defined in

[src/option.ts:165](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L165)

___

### aliases

• **aliases**: `string`[]

#### Implementation of

OptionConfig.aliases

#### Defined in

[src/option.ts:166](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L166)

___

### negationAliases

• **negationAliases**: `string`[]

#### Implementation of

OptionConfig.negationAliases

#### Defined in

[src/option.ts:167](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L167)

___

### parse

• **parse**: [`Parser`](../modules/option.md#parser-8)\<`Args`, `OptionType`\>

#### Implementation of

OptionConfig.parse

#### Defined in

[src/option.ts:168](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L168)

___

### isArray

• **isArray**: `boolean`

#### Defined in

[src/option.ts:169](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L169)

___

### isRequired

• **isRequired**: `boolean`

#### Defined in

[src/option.ts:170](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L170)

___

### isDefault

• **isDefault**: `boolean`

#### Implementation of

OptionConfig.isDefault

#### Defined in

[src/option.ts:171](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L171)

___

### outputName

• `Optional` **outputName**: `string`

#### Implementation of

OptionConfig.outputName

#### Defined in

[src/option.ts:172](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L172)

## Methods

### fromTypedConfig

▸ **fromTypedConfig**\<`T`, `A`\>(`config`): [`MassargOption`](option.MassargOption.md)\<`T`, [`ArgsObject`](../modules/command.md#argsobject-8)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |
| `A` | extends [`ArgsObject`](../modules/command.md#argsobject-8) = [`ArgsObject`](../modules/command.md#argsobject-8) |

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
| `config.parse?` | [`Parser`](../modules/option.md#parser-8)\<`A`, `T`\> | Parse the value of the option. You can return any type here, or throw an error if the value is invalid. |
| `config.type?` | ``"number"`` | - |

#### Returns

[`MassargOption`](option.MassargOption.md)\<`T`, [`ArgsObject`](../modules/command.md#argsobject-8)\>

#### Defined in

[src/option.ts:189](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L189)

___

### getOutputName

▸ **getOutputName**(): `string`

#### Returns

`string`

#### Defined in

[src/option.ts:199](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L199)

___

### parseDetails

▸ **parseDetails**(`argv`, `options`, `prefixes`): `ArgvValue`\<`OptionType`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `argv` | `string`[] |
| `options` | [`ArgsObject`](../modules/command.md#argsobject-8) |
| `prefixes` | [`Prefixes`](../modules/option.md#prefixes-8) |

#### Returns

`ArgvValue`\<`OptionType`\>

#### Defined in

[src/option.ts:203](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L203)

___

### helpString

▸ **helpString**(): `string`

#### Returns

`string`

#### Defined in

[src/option.ts:231](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L231)

___

### isMatch

▸ **isMatch**(`arg`, `prefixes`): `boolean`

Returns true if the flag (including any prefixes) matches the name or aliases

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `string` |
| `prefixes` | [`Prefixes`](../modules/option.md#prefixes-8) |

#### Returns

`boolean`

#### Defined in

[src/option.ts:237](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L237)

___

### qualifiedNames

▸ **qualifiedNames**(`prefixes`): [`QualifiedNames`](../modules/option.md#qualifiednames-8)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefixes` | [`Prefixes`](../modules/option.md#prefixes-8) |

#### Returns

[`QualifiedNames`](../modules/option.md#qualifiednames-8)

#### Defined in

[src/option.ts:247](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L247)
