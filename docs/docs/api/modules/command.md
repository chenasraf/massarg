---
id: "command"
title: "Module: command"
sidebar_label: "command"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [MassargCommand](../classes/command.MassargCommand.md)
- [MassargHelpCommand](../classes/command.MassargHelpCommand.md)

## Type Aliases

### CommandConfig

Ƭ **CommandConfig**\<`RunArgs`\>: `z.infer`\<`ReturnType`\<typeof [`CommandConfig`](command.md#commandconfig-16)\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `RunArgs` | extends [`ArgsObject`](command.md#argsobject-8) = [`ArgsObject`](command.md#argsobject-8) |

#### Defined in

[src/command.ts:18](https://github.com/chenasraf/massarg/blob/48b3e64/src/command.ts#L18)

[src/command.ts:40](https://github.com/chenasraf/massarg/blob/48b3e64/src/command.ts#L40)

___

### ArgsObject

Ƭ **ArgsObject**: `Record`\<`string` \| `number` \| `symbol`, `any`\>

#### Defined in

[src/command.ts:44](https://github.com/chenasraf/massarg/blob/48b3e64/src/command.ts#L44)

___

### Runner

Ƭ **Runner**\<`Args`\>: (`options`: `Args`, `instance`: [`MassargCommand`](../classes/command.MassargCommand.md)\<`Args`\>) => `Promise`\<`void`\> \| `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Args` | extends [`ArgsObject`](command.md#argsobject-8) |

#### Type declaration

▸ (`options`, `instance`): `Promise`\<`void`\> \| `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Args` |
| `instance` | [`MassargCommand`](../classes/command.MassargCommand.md)\<`Args`\> |

##### Returns

`Promise`\<`void`\> \| `void`

#### Defined in

[src/command.ts:46](https://github.com/chenasraf/massarg/blob/48b3e64/src/command.ts#L46)

## Functions

### CommandConfig

▸ **CommandConfig**\<`RunArgs`\>(`args`): `ZodObject`\<\{ `name`: `ZodString` ; `description`: `ZodString` ; `aliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `run`: `ZodType`\<[`Runner`](command.md#runner-8)\<`RunArgs`\>, `ZodTypeDef`, [`Runner`](command.md#runner-8)\<`RunArgs`\>\> ; `optionPrefix`: `ZodOptional`\<`ZodDefault`\<`ZodString`\>\> ; `aliasPrefix`: `ZodOptional`\<`ZodDefault`\<`ZodString`\>\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `run`: [`Runner`](command.md#runner-8)\<`RunArgs`\> ; `aliases?`: `string`[] ; `optionPrefix?`: `string` ; `aliasPrefix?`: `string`  }, \{ `name`: `string` ; `description`: `string` ; `run`: [`Runner`](command.md#runner-8)\<`RunArgs`\> ; `aliases?`: `string`[] ; `optionPrefix?`: `string` ; `aliasPrefix?`: `string`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `RunArgs` | extends [`ArgsObject`](command.md#argsobject-8) = [`ArgsObject`](command.md#argsobject-8) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `ZodType`\<`RunArgs`, `ZodTypeDef`, `RunArgs`\> |

#### Returns

`ZodObject`\<\{ `name`: `ZodString` ; `description`: `ZodString` ; `aliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `run`: `ZodType`\<[`Runner`](command.md#runner-8)\<`RunArgs`\>, `ZodTypeDef`, [`Runner`](command.md#runner-8)\<`RunArgs`\>\> ; `optionPrefix`: `ZodOptional`\<`ZodDefault`\<`ZodString`\>\> ; `aliasPrefix`: `ZodOptional`\<`ZodDefault`\<`ZodString`\>\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `run`: [`Runner`](command.md#runner-8)\<`RunArgs`\> ; `aliases?`: `string`[] ; `optionPrefix?`: `string` ; `aliasPrefix?`: `string`  }, \{ `name`: `string` ; `description`: `string` ; `run`: [`Runner`](command.md#runner-8)\<`RunArgs`\> ; `aliases?`: `string`[] ; `optionPrefix?`: `string` ; `aliasPrefix?`: `string`  }\>

#### Defined in

[src/command.ts:18](https://github.com/chenasraf/massarg/blob/48b3e64/src/command.ts#L18)
