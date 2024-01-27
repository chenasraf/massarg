---
id: "option.MassargHelpFlag"
title: "Class: MassargHelpFlag"
sidebar_label: "MassargHelpFlag"
custom_edit_url: null
---

[option](../modules/option.md).MassargHelpFlag

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

- [`MassargFlag`](option.MassargFlag.md)

  ↳ **`MassargHelpFlag`**

## Constructors

### constructor

• **new MassargHelpFlag**(`config?`): [`MassargHelpFlag`](option.MassargHelpFlag.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<`Omit`\<\{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `parse?`: [`Parser`](../modules/option.md#parser)\<[`ArgsObject`](../modules/command.md#argsobject), `boolean`\> ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string`  }, ``"parse"``\>\> |

#### Returns

[`MassargHelpFlag`](option.MassargHelpFlag.md)

#### Overrides

[MassargFlag](option.MassargFlag.md).[constructor](option.MassargFlag.md#constructor)

#### Defined in

[src/option.ts:397](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L397)

## Properties

### negatable

• **negatable**: `boolean`

#### Inherited from

[MassargFlag](option.MassargFlag.md).[negatable](option.MassargFlag.md#negatable)

#### Defined in

[src/option.ts:346](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L346)

___

### name

• **name**: `string`

#### Inherited from

[MassargFlag](option.MassargFlag.md).[name](option.MassargFlag.md#name)

#### Defined in

[src/option.ts:162](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L162)

___

### negationName

• **negationName**: `string`

#### Inherited from

[MassargFlag](option.MassargFlag.md).[negationName](option.MassargFlag.md#negationname)

#### Defined in

[src/option.ts:163](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L163)

___

### description

• **description**: `string`

#### Inherited from

[MassargFlag](option.MassargFlag.md).[description](option.MassargFlag.md#description)

#### Defined in

[src/option.ts:164](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L164)

___

### defaultValue

• `Optional` **defaultValue**: `boolean`

#### Inherited from

[MassargFlag](option.MassargFlag.md).[defaultValue](option.MassargFlag.md#defaultvalue)

#### Defined in

[src/option.ts:165](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L165)

___

### aliases

• **aliases**: `string`[]

#### Inherited from

[MassargFlag](option.MassargFlag.md).[aliases](option.MassargFlag.md#aliases)

#### Defined in

[src/option.ts:166](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L166)

___

### negationAliases

• **negationAliases**: `string`[]

#### Inherited from

[MassargFlag](option.MassargFlag.md).[negationAliases](option.MassargFlag.md#negationaliases)

#### Defined in

[src/option.ts:167](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L167)

___

### parse

• **parse**: [`Parser`](../modules/option.md#parser)\<[`ArgsObject`](../modules/command.md#argsobject), `boolean`\>

#### Inherited from

[MassargFlag](option.MassargFlag.md).[parse](option.MassargFlag.md#parse)

#### Defined in

[src/option.ts:168](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L168)

___

### isArray

• **isArray**: `boolean`

#### Inherited from

[MassargFlag](option.MassargFlag.md).[isArray](option.MassargFlag.md#isarray)

#### Defined in

[src/option.ts:169](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L169)

___

### isRequired

• **isRequired**: `boolean`

#### Inherited from

[MassargFlag](option.MassargFlag.md).[isRequired](option.MassargFlag.md#isrequired)

#### Defined in

[src/option.ts:170](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L170)

___

### isDefault

• **isDefault**: `boolean`

#### Inherited from

[MassargFlag](option.MassargFlag.md).[isDefault](option.MassargFlag.md#isdefault)

#### Defined in

[src/option.ts:171](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L171)

___

### outputName

• `Optional` **outputName**: `string`

#### Inherited from

[MassargFlag](option.MassargFlag.md).[outputName](option.MassargFlag.md#outputname)

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

[MassargFlag](option.MassargFlag.md).[fromTypedConfig](option.MassargFlag.md#fromtypedconfig)

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

#### Inherited from

[MassargFlag](option.MassargFlag.md).[parseDetails](option.MassargFlag.md#parsedetails)

#### Defined in

[src/option.ts:356](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L356)

___

### getOutputName

▸ **getOutputName**(): `string`

#### Returns

`string`

#### Inherited from

[MassargFlag](option.MassargFlag.md).[getOutputName](option.MassargFlag.md#getoutputname)

#### Defined in

[src/option.ts:199](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L199)

___

### helpString

▸ **helpString**(): `string`

#### Returns

`string`

#### Inherited from

[MassargFlag](option.MassargFlag.md).[helpString](option.MassargFlag.md#helpstring)

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

[MassargFlag](option.MassargFlag.md).[isMatch](option.MassargFlag.md#ismatch)

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

[MassargFlag](option.MassargFlag.md).[qualifiedNames](option.MassargFlag.md#qualifiednames)

#### Defined in

[src/option.ts:247](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L247)
