---
id: "MassargNumber"
title: "Class: MassargNumber"
sidebar_label: "MassargNumber"
sidebar_position: 0
custom_edit_url: null
---

An option that can be passed to a command.

This type of option parses a number, and fails if it is not a valid number.

**`Example`**

```ts
massarg(options).option({
  name: 'number',
  description: 'A number',
  defaultValue: 0,
  aliases: ['n'],
  type: 'number',
})
```

## Hierarchy

- [`MassargOption`](MassargOption.md)\<`number`\>

  ↳ **`MassargNumber`**

## Constructors

### constructor

• **new MassargNumber**(`options`): [`MassargNumber`](MassargNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Omit`\<\{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `parse?`: [`Parser`](../modules.md#parser)\<[`ArgsObject`](../modules.md#argsobject), `number`\> ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string`  }, ``"parse"``\> |

#### Returns

[`MassargNumber`](MassargNumber.md)

#### Overrides

[MassargOption](MassargOption.md).[constructor](MassargOption.md#constructor)

#### Defined in

[src/option.ts:291](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L291)

## Properties

### name

• **name**: `string`

#### Inherited from

[MassargOption](MassargOption.md).[name](MassargOption.md#name)

#### Defined in

[src/option.ts:162](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L162)

___

### negationName

• **negationName**: `string`

#### Inherited from

[MassargOption](MassargOption.md).[negationName](MassargOption.md#negationname)

#### Defined in

[src/option.ts:163](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L163)

___

### description

• **description**: `string`

#### Inherited from

[MassargOption](MassargOption.md).[description](MassargOption.md#description)

#### Defined in

[src/option.ts:164](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L164)

___

### defaultValue

• `Optional` **defaultValue**: `number`

#### Inherited from

[MassargOption](MassargOption.md).[defaultValue](MassargOption.md#defaultvalue)

#### Defined in

[src/option.ts:165](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L165)

___

### aliases

• **aliases**: `string`[]

#### Inherited from

[MassargOption](MassargOption.md).[aliases](MassargOption.md#aliases)

#### Defined in

[src/option.ts:166](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L166)

___

### negationAliases

• **negationAliases**: `string`[]

#### Inherited from

[MassargOption](MassargOption.md).[negationAliases](MassargOption.md#negationaliases)

#### Defined in

[src/option.ts:167](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L167)

___

### parse

• **parse**: [`Parser`](../modules.md#parser)\<[`ArgsObject`](../modules.md#argsobject), `number`\>

#### Inherited from

[MassargOption](MassargOption.md).[parse](MassargOption.md#parse)

#### Defined in

[src/option.ts:168](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L168)

___

### isArray

• **isArray**: `boolean`

#### Inherited from

[MassargOption](MassargOption.md).[isArray](MassargOption.md#isarray)

#### Defined in

[src/option.ts:169](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L169)

___

### isRequired

• **isRequired**: `boolean`

#### Inherited from

[MassargOption](MassargOption.md).[isRequired](MassargOption.md#isrequired)

#### Defined in

[src/option.ts:170](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L170)

___

### isDefault

• **isDefault**: `boolean`

#### Inherited from

[MassargOption](MassargOption.md).[isDefault](MassargOption.md#isdefault)

#### Defined in

[src/option.ts:171](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L171)

___

### outputName

• `Optional` **outputName**: `string`

#### Inherited from

[MassargOption](MassargOption.md).[outputName](MassargOption.md#outputname)

#### Defined in

[src/option.ts:172](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L172)

## Methods

### fromTypedConfig

▸ **fromTypedConfig**\<`T`, `A`\>(`config`): [`MassargOption`](MassargOption.md)\<`T`, [`ArgsObject`](../modules.md#argsobject)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |
| `A` | extends [`ArgsObject`](../modules.md#argsobject) = [`ArgsObject`](../modules.md#argsobject) |

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
| `config.parse?` | [`Parser`](../modules.md#parser)\<`A`, `T`\> | Parse the value of the option. You can return any type here, or throw an error if the value is invalid. |
| `config.type?` | ``"number"`` | - |

#### Returns

[`MassargOption`](MassargOption.md)\<`T`, [`ArgsObject`](../modules.md#argsobject)\>

#### Inherited from

[MassargOption](MassargOption.md).[fromTypedConfig](MassargOption.md#fromtypedconfig)

#### Defined in

[src/option.ts:189](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L189)

___

### parseDetails

▸ **parseDetails**(`argv`, `options`, `prefixes`): `ArgvValue`\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `argv` | `string`[] |
| `options` | [`ArgsObject`](../modules.md#argsobject) |
| `prefixes` | [`Prefixes`](../modules.md#prefixes) |

#### Returns

`ArgvValue`\<`number`\>

#### Overrides

[MassargOption](MassargOption.md).[parseDetails](MassargOption.md#parsedetails)

#### Defined in

[src/option.ts:298](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L298)

___

### getOutputName

▸ **getOutputName**(): `string`

#### Returns

`string`

#### Inherited from

[MassargOption](MassargOption.md).[getOutputName](MassargOption.md#getoutputname)

#### Defined in

[src/option.ts:199](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L199)

___

### helpString

▸ **helpString**(): `string`

#### Returns

`string`

#### Inherited from

[MassargOption](MassargOption.md).[helpString](MassargOption.md#helpstring)

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
| `prefixes` | [`Prefixes`](../modules.md#prefixes) |

#### Returns

`boolean`

#### Inherited from

[MassargOption](MassargOption.md).[isMatch](MassargOption.md#ismatch)

#### Defined in

[src/option.ts:237](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L237)

___

### qualifiedNames

▸ **qualifiedNames**(`prefixes`): [`QualifiedNames`](../modules.md#qualifiednames)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefixes` | [`Prefixes`](../modules.md#prefixes) |

#### Returns

[`QualifiedNames`](../modules.md#qualifiednames)

#### Inherited from

[MassargOption](MassargOption.md).[qualifiedNames](MassargOption.md#qualifiednames)

#### Defined in

[src/option.ts:247](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L247)
