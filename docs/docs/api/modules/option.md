---
id: "option"
title: "Module: option"
sidebar_label: "option"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [MassargOption](../classes/option.MassargOption.md)
- [MassargNumber](../classes/option.MassargNumber.md)
- [MassargFlag](../classes/option.MassargFlag.md)
- [MassargHelpFlag](../classes/option.MassargHelpFlag.md)

## Type Aliases

### OptionConfig

Ƭ **OptionConfig**\<`T`, `Args`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |
| `Args` | extends [`ArgsObject`](command.md#argsobject) = [`ArgsObject`](command.md#argsobject) |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the option |
| `description` | `string` | Description of the option, displayed in the help output |
| `aliases` | `string`[] | Aliases for the option, which can be used with the shorthand option notation. |
| `negationName?` | `string` | Negation name of the option, which can be used with the full option notation, e.g. `loud` for `--loud`. Defaults to `no-{name}`, e.g. `--no-quiet`. |
| `defaultValue?` | `any` | Default value of the option |
| `negationAliases?` | `string`[] | Negation aliases for the option, which can be used with the shorthand option notation, e.g. `Q` for `-Q`. Defaults to uppercase of each of the aliases provided. |
| `parse?` | [`Parser`](option.md#parser)\<`Args`, `T`\> | Parse the value of the option. You can return any type here, or throw an error if the value is invalid. |
| `array?` | `boolean` | Whether the option is an array. Array options can be specified multiple times, and the values will be collected into an array. Normally, specifying an option multiple times will override the previous value. |
| `required?` | `boolean` | Whether the option is required. If it is required, parsing will throw an error if it's not present. |
| `isDefault?` | `boolean` | Whether the option is the default option. The default option is the option that is used if no other option is specified, e.g. a value is passed in without an option name. Note that if commands match the same argument first, they will be used instead of the default option. |
| `hidden?` | `boolean` | Whether the option is hidden. Hidden options are not displayed in the help output. |
| `outputName?` | `string` | Specify a custom name for the output, which will be used when parsing the args. |

#### Defined in

[src/option.ts:6](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L6)

[src/option.ts:59](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L59)

___

### FlagConfig

Ƭ **FlagConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the option |
| `description` | `string` | Description of the option, displayed in the help output |
| `aliases` | `string`[] | Aliases for the option, which can be used with the shorthand option notation. |
| `negationName?` | `string` | Negation name of the option, which can be used with the full option notation, e.g. `loud` for `--loud`. Defaults to `no-{name}`, e.g. `--no-quiet`. |
| `defaultValue?` | `any` | Default value of the option |
| `negationAliases?` | `string`[] | Negation aliases for the option, which can be used with the shorthand option notation, e.g. `Q` for `-Q`. Defaults to uppercase of each of the aliases provided. |
| `array?` | `boolean` | Whether the option is an array. Array options can be specified multiple times, and the values will be collected into an array. Normally, specifying an option multiple times will override the previous value. |
| `required?` | `boolean` | Whether the option is required. If it is required, parsing will throw an error if it's not present. |
| `hidden?` | `boolean` | Whether the option is hidden. Hidden options are not displayed in the help output. |
| `outputName?` | `string` | Specify a custom name for the output, which will be used when parsing the args. |
| `negatable?` | `boolean` | Whether the flag can be negated, e.g. `--no-verbose` |

#### Defined in

[src/option.ts:63](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L63)

[src/option.ts:71](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L71)

___

### Parser

Ƭ **Parser**\<`Args`, `OptionType`\>: (`x`: `string`, `y`: `Args`) => `OptionType`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Args` | extends [`ArgsObject`](command.md#argsobject) = [`ArgsObject`](command.md#argsobject) |
| `OptionType` | extends `any` = `any` |

#### Type declaration

▸ (`x`, `y`): `OptionType`

##### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `string` |
| `y` | `Args` |

##### Returns

`OptionType`

#### Defined in

[src/option.ts:73](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L73)

___

### TypedOptionConfig

Ƭ **TypedOptionConfig**\<`T`, `A`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `A` | extends [`ArgsObject`](command.md#argsobject) = [`ArgsObject`](command.md#argsobject) |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the option |
| `description` | `string` | Description of the option, displayed in the help output |
| `aliases` | `string`[] | Aliases for the option, which can be used with the shorthand option notation. |
| `negationName?` | `string` | Negation name of the option, which can be used with the full option notation, e.g. `loud` for `--loud`. Defaults to `no-{name}`, e.g. `--no-quiet`. |
| `defaultValue?` | `any` | Default value of the option |
| `negationAliases?` | `string`[] | Negation aliases for the option, which can be used with the shorthand option notation, e.g. `Q` for `-Q`. Defaults to uppercase of each of the aliases provided. |
| `array?` | `boolean` | Whether the option is an array. Array options can be specified multiple times, and the values will be collected into an array. Normally, specifying an option multiple times will override the previous value. |
| `required?` | `boolean` | Whether the option is required. If it is required, parsing will throw an error if it's not present. |
| `isDefault?` | `boolean` | Whether the option is the default option. The default option is the option that is used if no other option is specified, e.g. a value is passed in without an option name. Note that if commands match the same argument first, they will be used instead of the default option. |
| `hidden?` | `boolean` | Whether the option is hidden. Hidden options are not displayed in the help output. |
| `outputName?` | `string` | Specify a custom name for the output, which will be used when parsing the args. |
| `parse?` | [`Parser`](option.md#parser)\<`A`, `T`\> | Parse the value of the option. You can return any type here, or throw an error if the value is invalid. |
| `type?` | ``"number"`` | - |

#### Defined in

[src/option.ts:78](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L78)

[src/option.ts:86](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L86)

___

### ArrayOptionConfig

Ƭ **ArrayOptionConfig**\<`T`\>: `Object`

An option that can be passed to a command.

This type represents an array option, which can be specified multiple times.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the option |
| `description` | `string` | Description of the option, displayed in the help output |
| `aliases` | `string`[] | Aliases for the option, which can be used with the shorthand option notation. |
| `type?` | ``"number"`` | - |
| `negationName?` | `string` | Negation name of the option, which can be used with the full option notation, e.g. `loud` for `--loud`. Defaults to `no-{name}`, e.g. `--no-quiet`. |
| `negationAliases?` | `string`[] | Negation aliases for the option, which can be used with the shorthand option notation, e.g. `Q` for `-Q`. Defaults to uppercase of each of the aliases provided. |
| `array?` | `boolean` | Whether the option is an array. Array options can be specified multiple times, and the values will be collected into an array. Normally, specifying an option multiple times will override the previous value. |
| `required?` | `boolean` | Whether the option is required. If it is required, parsing will throw an error if it's not present. |
| `isDefault?` | `boolean` | Whether the option is the default option. The default option is the option that is used if no other option is specified, e.g. a value is passed in without an option name. Note that if commands match the same argument first, they will be used instead of the default option. |
| `hidden?` | `boolean` | Whether the option is hidden. Hidden options are not displayed in the help output. |
| `outputName?` | `string` | Specify a custom name for the output, which will be used when parsing the args. |
| `parse?` | [`Parser`](option.md#parser)\<[`ArgsObject`](command.md#argsobject), `ZodType`\<`T`, `ZodTypeDef`, `T`\>[]\> | Parse the value of the option. You can return any type here, or throw an error if the value is invalid. |
| `defaultValue?` | `ZodType`\<`T`, `ZodTypeDef`, `T`\>[] | - |

#### Defined in

[src/option.ts:94](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L94)

[src/option.ts:107](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L107)

___

### Prefixes

Ƭ **Prefixes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `normalPrefix` | `string` |
| `aliasPrefix` | `string` |

#### Defined in

[src/option.ts:115](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L115)

___

### Names

Ƭ **Names**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `aliases` | `string`[] |

#### Defined in

[src/option.ts:121](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L121)

___

### QualifiedNames

Ƭ **QualifiedNames**: `Object`

Names with prefixes built-in

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `aliases` | `string`[] |
| `negationName` | `string` |
| `negationAliases` | `string`[] |

#### Defined in

[src/option.ts:127](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L127)

## Variables

### FlagConfig

• `Const` **FlagConfig**: `ZodObject`\<\{ `name`: `ZodString` ; `negationName`: `ZodOptional`\<`ZodString`\> ; `description`: `ZodString` ; `defaultValue`: `ZodOptional`\<`ZodAny`\> ; `aliases`: `ZodArray`\<`ZodString`, ``"many"``\> ; `negationAliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `array`: `ZodOptional`\<`ZodBoolean`\> ; `required`: `ZodOptional`\<`ZodBoolean`\> ; `hidden`: `ZodOptional`\<`ZodBoolean`\> ; `outputName`: `ZodOptional`\<`ZodString`\> ; `negatable`: `ZodOptional`\<`ZodBoolean`\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `negatable?`: `boolean`  }, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `negatable?`: `boolean`  }\>

#### Defined in

[src/option.ts:63](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L63)

[src/option.ts:71](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L71)

___

### DEFAULT\_OPT\_FULL\_PREFIX

• `Const` **DEFAULT\_OPT\_FULL\_PREFIX**: ``"--"``

#### Defined in

[src/option.ts:111](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L111)

___

### DEFAULT\_OPT\_SHORT\_PREFIX

• `Const` **DEFAULT\_OPT\_SHORT\_PREFIX**: ``"-"``

#### Defined in

[src/option.ts:112](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L112)

## Functions

### OptionConfig

▸ **OptionConfig**\<`OptionType`, `Args`\>(`type`): `ZodObject`\<\{ `name`: `ZodString` ; `negationName`: `ZodOptional`\<`ZodString`\> ; `description`: `ZodString` ; `defaultValue`: `ZodOptional`\<`ZodAny`\> ; `aliases`: `ZodArray`\<`ZodString`, ``"many"``\> ; `negationAliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `parse`: `ZodOptional`\<`ZodType`\<[`Parser`](option.md#parser)\<`Args`, `OptionType`\>, `ZodTypeDef`, [`Parser`](option.md#parser)\<`Args`, `OptionType`\>\>\> ; `array`: `ZodOptional`\<`ZodBoolean`\> ; `required`: `ZodOptional`\<`ZodBoolean`\> ; `isDefault`: `ZodOptional`\<`ZodBoolean`\> ; `hidden`: `ZodOptional`\<`ZodBoolean`\> ; `outputName`: `ZodOptional`\<`ZodString`\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `parse?`: [`Parser`](option.md#parser)\<`Args`, `OptionType`\> ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string`  }, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `parse?`: [`Parser`](option.md#parser)\<`Args`, `OptionType`\> ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `OptionType` | `OptionType` |
| `Args` | extends [`ArgsObject`](command.md#argsobject) = [`ArgsObject`](command.md#argsobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `ZodType`\<`OptionType`, `ZodTypeDef`, `OptionType`\> |

#### Returns

`ZodObject`\<\{ `name`: `ZodString` ; `negationName`: `ZodOptional`\<`ZodString`\> ; `description`: `ZodString` ; `defaultValue`: `ZodOptional`\<`ZodAny`\> ; `aliases`: `ZodArray`\<`ZodString`, ``"many"``\> ; `negationAliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `parse`: `ZodOptional`\<`ZodType`\<[`Parser`](option.md#parser)\<`Args`, `OptionType`\>, `ZodTypeDef`, [`Parser`](option.md#parser)\<`Args`, `OptionType`\>\>\> ; `array`: `ZodOptional`\<`ZodBoolean`\> ; `required`: `ZodOptional`\<`ZodBoolean`\> ; `isDefault`: `ZodOptional`\<`ZodBoolean`\> ; `hidden`: `ZodOptional`\<`ZodBoolean`\> ; `outputName`: `ZodOptional`\<`ZodString`\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `parse?`: [`Parser`](option.md#parser)\<`Args`, `OptionType`\> ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string`  }, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `parse?`: [`Parser`](option.md#parser)\<`Args`, `OptionType`\> ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string`  }\>

#### Defined in

[src/option.ts:6](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L6)

___

### TypedOptionConfig

▸ **TypedOptionConfig**\<`OptionType`, `Args`\>(`type`): `ZodObject`\<\{ `name`: `ZodString` ; `negationName`: `ZodOptional`\<`ZodString`\> ; `description`: `ZodString` ; `defaultValue`: `ZodOptional`\<`ZodAny`\> ; `aliases`: `ZodArray`\<`ZodString`, ``"many"``\> ; `negationAliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `array`: `ZodOptional`\<`ZodBoolean`\> ; `required`: `ZodOptional`\<`ZodBoolean`\> ; `isDefault`: `ZodOptional`\<`ZodBoolean`\> ; `hidden`: `ZodOptional`\<`ZodBoolean`\> ; `outputName`: `ZodOptional`\<`ZodString`\> ; `parse`: `ZodOptional`\<`ZodType`\<[`Parser`](option.md#parser)\<`Args`, `OptionType`\>, `ZodTypeDef`, [`Parser`](option.md#parser)\<`Args`, `OptionType`\>\>\> ; `type`: `ZodOptional`\<`ZodEnum`\<[``"number"``]\>\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `parse?`: [`Parser`](option.md#parser)\<`Args`, `OptionType`\> ; `type?`: ``"number"``  }, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `parse?`: [`Parser`](option.md#parser)\<`Args`, `OptionType`\> ; `type?`: ``"number"``  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `OptionType` | `OptionType` |
| `Args` | extends [`ArgsObject`](command.md#argsobject) = [`ArgsObject`](command.md#argsobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `ZodType`\<`OptionType`, `ZodTypeDef`, `OptionType`\> |

#### Returns

`ZodObject`\<\{ `name`: `ZodString` ; `negationName`: `ZodOptional`\<`ZodString`\> ; `description`: `ZodString` ; `defaultValue`: `ZodOptional`\<`ZodAny`\> ; `aliases`: `ZodArray`\<`ZodString`, ``"many"``\> ; `negationAliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `array`: `ZodOptional`\<`ZodBoolean`\> ; `required`: `ZodOptional`\<`ZodBoolean`\> ; `isDefault`: `ZodOptional`\<`ZodBoolean`\> ; `hidden`: `ZodOptional`\<`ZodBoolean`\> ; `outputName`: `ZodOptional`\<`ZodString`\> ; `parse`: `ZodOptional`\<`ZodType`\<[`Parser`](option.md#parser)\<`Args`, `OptionType`\>, `ZodTypeDef`, [`Parser`](option.md#parser)\<`Args`, `OptionType`\>\>\> ; `type`: `ZodOptional`\<`ZodEnum`\<[``"number"``]\>\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `parse?`: [`Parser`](option.md#parser)\<`Args`, `OptionType`\> ; `type?`: ``"number"``  }, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `parse?`: [`Parser`](option.md#parser)\<`Args`, `OptionType`\> ; `type?`: ``"number"``  }\>

#### Defined in

[src/option.ts:78](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L78)

___

### ArrayOptionConfig

▸ **ArrayOptionConfig**\<`T`, `A`\>(`type`): `ZodObject`\<\{ `type`: `ZodOptional`\<`ZodEnum`\<[``"number"``]\>\> ; `name`: `ZodString` ; `negationName`: `ZodOptional`\<`ZodString`\> ; `description`: `ZodString` ; `aliases`: `ZodArray`\<`ZodString`, ``"many"``\> ; `negationAliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `array`: `ZodOptional`\<`ZodBoolean`\> ; `required`: `ZodOptional`\<`ZodBoolean`\> ; `isDefault`: `ZodOptional`\<`ZodBoolean`\> ; `hidden`: `ZodOptional`\<`ZodBoolean`\> ; `outputName`: `ZodOptional`\<`ZodString`\> ; `parse`: `ZodOptional`\<`ZodType`\<[`Parser`](option.md#parser)\<`A`, `T`[]\>, `ZodTypeDef`, [`Parser`](option.md#parser)\<`A`, `T`[]\>\>\> ; `defaultValue`: `ZodOptional`\<`ZodArray`\<`ZodType`\<`T`, `ZodTypeDef`, `T`\>, ``"many"``\>\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `type?`: ``"number"`` ; `negationName?`: `string` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `parse?`: [`Parser`](option.md#parser)\<`A`, `T`[]\> ; `defaultValue?`: `T`[]  }, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `type?`: ``"number"`` ; `negationName?`: `string` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `parse?`: [`Parser`](option.md#parser)\<`A`, `T`[]\> ; `defaultValue?`: `T`[]  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `A` | extends [`ArgsObject`](command.md#argsobject) = [`ArgsObject`](command.md#argsobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `ZodType`\<`T`, `ZodTypeDef`, `T`\> |

#### Returns

`ZodObject`\<\{ `type`: `ZodOptional`\<`ZodEnum`\<[``"number"``]\>\> ; `name`: `ZodString` ; `negationName`: `ZodOptional`\<`ZodString`\> ; `description`: `ZodString` ; `aliases`: `ZodArray`\<`ZodString`, ``"many"``\> ; `negationAliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `array`: `ZodOptional`\<`ZodBoolean`\> ; `required`: `ZodOptional`\<`ZodBoolean`\> ; `isDefault`: `ZodOptional`\<`ZodBoolean`\> ; `hidden`: `ZodOptional`\<`ZodBoolean`\> ; `outputName`: `ZodOptional`\<`ZodString`\> ; `parse`: `ZodOptional`\<`ZodType`\<[`Parser`](option.md#parser)\<`A`, `T`[]\>, `ZodTypeDef`, [`Parser`](option.md#parser)\<`A`, `T`[]\>\>\> ; `defaultValue`: `ZodOptional`\<`ZodArray`\<`ZodType`\<`T`, `ZodTypeDef`, `T`\>, ``"many"``\>\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `type?`: ``"number"`` ; `negationName?`: `string` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `parse?`: [`Parser`](option.md#parser)\<`A`, `T`[]\> ; `defaultValue?`: `T`[]  }, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `type?`: ``"number"`` ; `negationName?`: `string` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `parse?`: [`Parser`](option.md#parser)\<`A`, `T`[]\> ; `defaultValue?`: `T`[]  }\>

**`See`**

 - OptionConfig
 - ArrayOptionConfig

#### Defined in

[src/option.ts:94](https://github.com/chenasraf/massarg/blob/fe2fc21/src/option.ts#L94)
