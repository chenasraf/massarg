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

Ƭ **OptionConfig**\<`T`, `Args`\>: `z.infer`\<`ReturnType`\<typeof [`OptionConfig`](option.md#optionconfig-16)\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |
| `Args` | extends [`ArgsObject`](command.md#argsobject-8) = [`ArgsObject`](command.md#argsobject-8) |

#### Defined in

[src/option.ts:6](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L6)

[src/option.ts:59](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L59)

___

### FlagConfig

Ƭ **FlagConfig**: `z.infer`\<typeof [`FlagConfig`](option.md#flagconfig-16)\>

#### Defined in

[src/option.ts:63](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L63)

[src/option.ts:71](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L71)

___

### Parser

Ƭ **Parser**\<`Args`, `OptionType`\>: (`x`: `string`, `y`: `Args`) => `OptionType`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Args` | extends [`ArgsObject`](command.md#argsobject-8) = [`ArgsObject`](command.md#argsobject-8) |
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

[src/option.ts:73](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L73)

___

### TypedOptionConfig

Ƭ **TypedOptionConfig**\<`T`, `A`\>: `z.infer`\<`ReturnType`\<typeof [`TypedOptionConfig`](option.md#typedoptionconfig-16)\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `A` | extends [`ArgsObject`](command.md#argsobject-8) = [`ArgsObject`](command.md#argsobject-8) |

#### Defined in

[src/option.ts:78](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L78)

[src/option.ts:86](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L86)

___

### ArrayOptionConfig

Ƭ **ArrayOptionConfig**\<`T`\>: `z.infer`\<`ReturnType`\<typeof [`ArrayOptionConfig`](option.md#arrayoptionconfig-16)\>\>

An option that can be passed to a command.

This type represents an array option, which can be specified multiple times.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Defined in

[src/option.ts:94](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L94)

[src/option.ts:107](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L107)

___

### Prefixes

Ƭ **Prefixes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `normalPrefix` | `string` |
| `aliasPrefix` | `string` |

#### Defined in

[src/option.ts:115](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L115)

___

### Names

Ƭ **Names**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `aliases` | `string`[] |

#### Defined in

[src/option.ts:121](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L121)

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

[src/option.ts:127](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L127)

## Variables

### FlagConfig

• `Const` **FlagConfig**: `ZodObject`\<\{ `name`: `ZodString` ; `negationName`: `ZodOptional`\<`ZodString`\> ; `description`: `ZodString` ; `defaultValue`: `ZodOptional`\<`ZodAny`\> ; `aliases`: `ZodArray`\<`ZodString`, ``"many"``\> ; `negationAliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `array`: `ZodOptional`\<`ZodBoolean`\> ; `required`: `ZodOptional`\<`ZodBoolean`\> ; `hidden`: `ZodOptional`\<`ZodBoolean`\> ; `outputName`: `ZodOptional`\<`ZodString`\> ; `negatable`: `ZodOptional`\<`ZodBoolean`\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `negatable?`: `boolean`  }, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `negatable?`: `boolean`  }\>

#### Defined in

[src/option.ts:63](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L63)

[src/option.ts:71](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L71)

___

### DEFAULT\_OPT\_FULL\_PREFIX

• `Const` **DEFAULT\_OPT\_FULL\_PREFIX**: ``"--"``

#### Defined in

[src/option.ts:111](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L111)

___

### DEFAULT\_OPT\_SHORT\_PREFIX

• `Const` **DEFAULT\_OPT\_SHORT\_PREFIX**: ``"-"``

#### Defined in

[src/option.ts:112](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L112)

## Functions

### OptionConfig

▸ **OptionConfig**\<`OptionType`, `Args`\>(`type`): `ZodObject`\<\{ `name`: `ZodString` ; `negationName`: `ZodOptional`\<`ZodString`\> ; `description`: `ZodString` ; `defaultValue`: `ZodOptional`\<`ZodAny`\> ; `aliases`: `ZodArray`\<`ZodString`, ``"many"``\> ; `negationAliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `parse`: `ZodOptional`\<`ZodType`\<[`Parser`](option.md#parser-8)\<`Args`, `OptionType`\>, `ZodTypeDef`, [`Parser`](option.md#parser-8)\<`Args`, `OptionType`\>\>\> ; `array`: `ZodOptional`\<`ZodBoolean`\> ; `required`: `ZodOptional`\<`ZodBoolean`\> ; `isDefault`: `ZodOptional`\<`ZodBoolean`\> ; `hidden`: `ZodOptional`\<`ZodBoolean`\> ; `outputName`: `ZodOptional`\<`ZodString`\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `parse?`: [`Parser`](option.md#parser-8)\<`Args`, `OptionType`\> ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string`  }, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `parse?`: [`Parser`](option.md#parser-8)\<`Args`, `OptionType`\> ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `OptionType` | `OptionType` |
| `Args` | extends [`ArgsObject`](command.md#argsobject-8) = [`ArgsObject`](command.md#argsobject-8) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `ZodType`\<`OptionType`, `ZodTypeDef`, `OptionType`\> |

#### Returns

`ZodObject`\<\{ `name`: `ZodString` ; `negationName`: `ZodOptional`\<`ZodString`\> ; `description`: `ZodString` ; `defaultValue`: `ZodOptional`\<`ZodAny`\> ; `aliases`: `ZodArray`\<`ZodString`, ``"many"``\> ; `negationAliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `parse`: `ZodOptional`\<`ZodType`\<[`Parser`](option.md#parser-8)\<`Args`, `OptionType`\>, `ZodTypeDef`, [`Parser`](option.md#parser-8)\<`Args`, `OptionType`\>\>\> ; `array`: `ZodOptional`\<`ZodBoolean`\> ; `required`: `ZodOptional`\<`ZodBoolean`\> ; `isDefault`: `ZodOptional`\<`ZodBoolean`\> ; `hidden`: `ZodOptional`\<`ZodBoolean`\> ; `outputName`: `ZodOptional`\<`ZodString`\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `parse?`: [`Parser`](option.md#parser-8)\<`Args`, `OptionType`\> ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string`  }, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `parse?`: [`Parser`](option.md#parser-8)\<`Args`, `OptionType`\> ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string`  }\>

#### Defined in

[src/option.ts:6](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L6)

___

### TypedOptionConfig

▸ **TypedOptionConfig**\<`OptionType`, `Args`\>(`type`): `ZodObject`\<\{ `name`: `ZodString` ; `negationName`: `ZodOptional`\<`ZodString`\> ; `description`: `ZodString` ; `defaultValue`: `ZodOptional`\<`ZodAny`\> ; `aliases`: `ZodArray`\<`ZodString`, ``"many"``\> ; `negationAliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `array`: `ZodOptional`\<`ZodBoolean`\> ; `required`: `ZodOptional`\<`ZodBoolean`\> ; `isDefault`: `ZodOptional`\<`ZodBoolean`\> ; `hidden`: `ZodOptional`\<`ZodBoolean`\> ; `outputName`: `ZodOptional`\<`ZodString`\> ; `parse`: `ZodOptional`\<`ZodType`\<[`Parser`](option.md#parser-8)\<`Args`, `OptionType`\>, `ZodTypeDef`, [`Parser`](option.md#parser-8)\<`Args`, `OptionType`\>\>\> ; `type`: `ZodOptional`\<`ZodEnum`\<[``"number"``]\>\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `parse?`: [`Parser`](option.md#parser-8)\<`Args`, `OptionType`\> ; `type?`: ``"number"``  }, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `parse?`: [`Parser`](option.md#parser-8)\<`Args`, `OptionType`\> ; `type?`: ``"number"``  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `OptionType` | `OptionType` |
| `Args` | extends [`ArgsObject`](command.md#argsobject-8) = [`ArgsObject`](command.md#argsobject-8) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `ZodType`\<`OptionType`, `ZodTypeDef`, `OptionType`\> |

#### Returns

`ZodObject`\<\{ `name`: `ZodString` ; `negationName`: `ZodOptional`\<`ZodString`\> ; `description`: `ZodString` ; `defaultValue`: `ZodOptional`\<`ZodAny`\> ; `aliases`: `ZodArray`\<`ZodString`, ``"many"``\> ; `negationAliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `array`: `ZodOptional`\<`ZodBoolean`\> ; `required`: `ZodOptional`\<`ZodBoolean`\> ; `isDefault`: `ZodOptional`\<`ZodBoolean`\> ; `hidden`: `ZodOptional`\<`ZodBoolean`\> ; `outputName`: `ZodOptional`\<`ZodString`\> ; `parse`: `ZodOptional`\<`ZodType`\<[`Parser`](option.md#parser-8)\<`Args`, `OptionType`\>, `ZodTypeDef`, [`Parser`](option.md#parser-8)\<`Args`, `OptionType`\>\>\> ; `type`: `ZodOptional`\<`ZodEnum`\<[``"number"``]\>\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `parse?`: [`Parser`](option.md#parser-8)\<`Args`, `OptionType`\> ; `type?`: ``"number"``  }, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `negationName?`: `string` ; `defaultValue?`: `any` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `parse?`: [`Parser`](option.md#parser-8)\<`Args`, `OptionType`\> ; `type?`: ``"number"``  }\>

#### Defined in

[src/option.ts:78](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L78)

___

### ArrayOptionConfig

▸ **ArrayOptionConfig**\<`T`, `A`\>(`type`): `ZodObject`\<\{ `type`: `ZodOptional`\<`ZodEnum`\<[``"number"``]\>\> ; `name`: `ZodString` ; `negationName`: `ZodOptional`\<`ZodString`\> ; `description`: `ZodString` ; `aliases`: `ZodArray`\<`ZodString`, ``"many"``\> ; `negationAliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `array`: `ZodOptional`\<`ZodBoolean`\> ; `required`: `ZodOptional`\<`ZodBoolean`\> ; `isDefault`: `ZodOptional`\<`ZodBoolean`\> ; `hidden`: `ZodOptional`\<`ZodBoolean`\> ; `outputName`: `ZodOptional`\<`ZodString`\> ; `parse`: `ZodOptional`\<`ZodType`\<[`Parser`](option.md#parser-8)\<`A`, `T`[]\>, `ZodTypeDef`, [`Parser`](option.md#parser-8)\<`A`, `T`[]\>\>\> ; `defaultValue`: `ZodOptional`\<`ZodArray`\<`ZodType`\<`T`, `ZodTypeDef`, `T`\>, ``"many"``\>\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `type?`: ``"number"`` ; `negationName?`: `string` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `parse?`: [`Parser`](option.md#parser-8)\<`A`, `T`[]\> ; `defaultValue?`: `T`[]  }, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `type?`: ``"number"`` ; `negationName?`: `string` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `parse?`: [`Parser`](option.md#parser-8)\<`A`, `T`[]\> ; `defaultValue?`: `T`[]  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `A` | extends [`ArgsObject`](command.md#argsobject-8) = [`ArgsObject`](command.md#argsobject-8) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `ZodType`\<`T`, `ZodTypeDef`, `T`\> |

#### Returns

`ZodObject`\<\{ `type`: `ZodOptional`\<`ZodEnum`\<[``"number"``]\>\> ; `name`: `ZodString` ; `negationName`: `ZodOptional`\<`ZodString`\> ; `description`: `ZodString` ; `aliases`: `ZodArray`\<`ZodString`, ``"many"``\> ; `negationAliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `array`: `ZodOptional`\<`ZodBoolean`\> ; `required`: `ZodOptional`\<`ZodBoolean`\> ; `isDefault`: `ZodOptional`\<`ZodBoolean`\> ; `hidden`: `ZodOptional`\<`ZodBoolean`\> ; `outputName`: `ZodOptional`\<`ZodString`\> ; `parse`: `ZodOptional`\<`ZodType`\<[`Parser`](option.md#parser-8)\<`A`, `T`[]\>, `ZodTypeDef`, [`Parser`](option.md#parser-8)\<`A`, `T`[]\>\>\> ; `defaultValue`: `ZodOptional`\<`ZodArray`\<`ZodType`\<`T`, `ZodTypeDef`, `T`\>, ``"many"``\>\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `type?`: ``"number"`` ; `negationName?`: `string` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `parse?`: [`Parser`](option.md#parser-8)\<`A`, `T`[]\> ; `defaultValue?`: `T`[]  }, \{ `name`: `string` ; `description`: `string` ; `aliases`: `string`[] ; `type?`: ``"number"`` ; `negationName?`: `string` ; `negationAliases?`: `string`[] ; `array?`: `boolean` ; `required?`: `boolean` ; `isDefault?`: `boolean` ; `hidden?`: `boolean` ; `outputName?`: `string` ; `parse?`: [`Parser`](option.md#parser-8)\<`A`, `T`[]\> ; `defaultValue?`: `T`[]  }\>

**`See`**

 - OptionConfig
 - ArrayOptionConfig

#### Defined in

[src/option.ts:94](https://github.com/chenasraf/massarg/blob/48b3e64/src/option.ts#L94)
