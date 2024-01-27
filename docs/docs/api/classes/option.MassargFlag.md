---
id: "option.MassargFlag"
title: "Class: MassargFlag"
sidebar_label: "MassargFlag"
custom_edit_url: null
---

[option](../modules/option.md).MassargFlag

An option that can be passed to a command.

A flag is an option that is either present or not. It can be used to toggle
a boolean value, or to indicate that a command should be run in a different
mode.

A flag can be negated by prefixing it with `no-`. For example, `--no-verbose`,
or by prefixing the alias with `^` instead of `-`. This is configurable via the command's
configuration. To turn this behavior on, set `negatable: true` in the flag's configuration.

**`Example`**

```ts
massarg.flag({
  name: 'verbose',
  aliases: ['v'],
  description: 'Enable verbose logging',
  defaultValue: false,
})
```

## Hierarchy

- [`MassargOption`](option.MassargOption.md)\<`boolean`\>

  ↳ **`MassargFlag`**

  ↳↳ [`MassargHelpFlag`](option.MassargHelpFlag.md)

## Constructors

### constructor

• **new MassargFlag**(`options`): [`MassargFlag`](option.MassargFlag.md)

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
| `options.array?` | `boolean` | Whether the option is an array. Array options can be specified multiple times, and the values will be collected into an array. Normally, specifying an option multiple times will override the previous value. |
| `options.required?` | `boolean` | Whether the option is required. If it is required, parsing will throw an error if it's not present. |
| `options.hidden?` | `boolean` | Whether the option is hidden. Hidden options are not displayed in the help output. |
| `options.outputName?` | `string` | Specify a custom name for the output, which will be used when parsing the args. |
| `options.negatable?` | `boolean` | Whether the flag can be negated, e.g. `--no-verbose` |

#### Returns

[`MassargFlag`](option.MassargFlag.md)

#### Overrides

[MassargOption](option.MassargOption.md).[constructor](option.MassargOption.md#constructor)

#### Defined in

[src/option.ts:348](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L348)

## Properties

### negatable

• **negatable**: `boolean`

#### Defined in

[src/option.ts:346](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L346)

___

### name

• **name**: `string`

#### Inherited from

[MassargOption](option.MassargOption.md).[name](option.MassargOption.md#name)

#### Defined in

[src/option.ts:162](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L162)

___

### negationName

• **negationName**: `string`

#### Inherited from

[MassargOption](option.MassargOption.md).[negationName](option.MassargOption.md#negationname)

#### Defined in

[src/option.ts:163](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L163)

___

### description

• **description**: `string`

#### Inherited from

[MassargOption](option.MassargOption.md).[description](option.MassargOption.md#description)

#### Defined in

[src/option.ts:164](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L164)

___

### defaultValue

• `Optional` **defaultValue**: `boolean`

#### Inherited from

[MassargOption](option.MassargOption.md).[defaultValue](option.MassargOption.md#defaultvalue)

#### Defined in

[src/option.ts:165](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L165)

___

### aliases

• **aliases**: `string`[]

#### Inherited from

[MassargOption](option.MassargOption.md).[aliases](option.MassargOption.md#aliases)

#### Defined in

[src/option.ts:166](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L166)

___

### negationAliases

• **negationAliases**: `string`[]

#### Inherited from

[MassargOption](option.MassargOption.md).[negationAliases](option.MassargOption.md#negationaliases)

#### Defined in

[src/option.ts:167](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L167)

___

### parse

• **parse**: [`Parser`](../modules/option.md#parser)\<[`ArgsObject`](../modules/command.md#argsobject), `boolean`\>

#### Inherited from

[MassargOption](option.MassargOption.md).[parse](option.MassargOption.md#parse)

#### Defined in

[src/option.ts:168](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L168)

___

### isArray

• **isArray**: `boolean`

#### Inherited from

[MassargOption](option.MassargOption.md).[isArray](option.MassargOption.md#isarray)

#### Defined in

[src/option.ts:169](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L169)

___

### isRequired

• **isRequired**: `boolean`

#### Inherited from

[MassargOption](option.MassargOption.md).[isRequired](option.MassargOption.md#isrequired)

#### Defined in

[src/option.ts:170](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L170)

___

### isDefault

• **isDefault**: `boolean`

#### Inherited from

[MassargOption](option.MassargOption.md).[isDefault](option.MassargOption.md#isdefault)

#### Defined in

[src/option.ts:171](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L171)

___

### outputName

• `Optional` **outputName**: `string`

#### Inherited from

[MassargOption](option.MassargOption.md).[outputName](option.MassargOption.md#outputname)

#### Defined in

[src/option.ts:172](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L172)

## Methods

### fromTypedConfig

▸ **fromTypedConfig**\<`T`, `A`\>(`config`): [`MassargOption`](option.MassargOption.md)\<`T`, [`ArgsObject`](../modules/command.md#argsobject)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |
| `A` | extends [`ArgsObject`](../modules/command.md#argsobject) = [`ArgsObject`](../modules/command.md#argsobject) |

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

[`MassargOption`](option.MassargOption.md)\<`T`, [`ArgsObject`](../modules/command.md#argsobject)\>

#### Inherited from

[MassargOption](option.MassargOption.md).[fromTypedConfig](option.MassargOption.md#fromtypedconfig)

#### Defined in

[src/option.ts:189](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L189)

___

### parseDetails

▸ **parseDetails**(`argv`, `_options`, `prefixes`): `ArgvValue`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `argv` | `string`[] |
| `_options` | [`ArgsObject`](../modules/command.md#argsobject) |
| `prefixes` | [`Prefixes`](../modules/option.md#prefixes) |

#### Returns

`ArgvValue`\<`boolean`\>

#### Overrides

[MassargOption](option.MassargOption.md).[parseDetails](option.MassargOption.md#parsedetails)

#### Defined in

[src/option.ts:356](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L356)

___

### getOutputName

▸ **getOutputName**(): `string`

#### Returns

`string`

#### Inherited from

[MassargOption](option.MassargOption.md).[getOutputName](option.MassargOption.md#getoutputname)

#### Defined in

[src/option.ts:199](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L199)

___

### helpString

▸ **helpString**(): `string`

#### Returns

`string`

#### Inherited from

[MassargOption](option.MassargOption.md).[helpString](option.MassargOption.md#helpstring)

#### Defined in

[src/option.ts:231](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L231)

___

### isMatch

▸ **isMatch**(`arg`, `prefixes`): `boolean`

Returns true if the flag (including any prefixes) matches the name or aliases

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `string` |
| `prefixes` | [`Prefixes`](../modules/option.md#prefixes) |

#### Returns

`boolean`

#### Inherited from

[MassargOption](option.MassargOption.md).[isMatch](option.MassargOption.md#ismatch)

#### Defined in

[src/option.ts:237](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L237)

___

### qualifiedNames

▸ **qualifiedNames**(`prefixes`): [`QualifiedNames`](../modules/option.md#qualifiednames)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefixes` | [`Prefixes`](../modules/option.md#prefixes) |

#### Returns

[`QualifiedNames`](../modules/option.md#qualifiednames)

#### Inherited from

[MassargOption](option.MassargOption.md).[qualifiedNames](option.MassargOption.md#qualifiednames)

#### Defined in

[src/option.ts:247](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L247)
