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

Ƭ **CommandConfig**\<`RunArgs`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `RunArgs` | extends [`ArgsObject`](command.md#argsobject) = [`ArgsObject`](command.md#argsobject) |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Command name |
| `description` | `string` | Command description, displayed in the help output |
| `run` | [`Runner`](command.md#runner)\<`RunArgs`\> | Function used when invoking this command. It receives the parsed options and the primary instance of Massarg used to invoke this command (the top-level instance) |
| `aliases?` | `string`[] | Command aliases |
| `optionPrefix?` | `string` | The prefix to match before option names, e.g. `--` |
| `aliasPrefix?` | `string` | The prefix to match before option aliases, e.g. `-` |

#### Defined in

[src/command.ts:18](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L18)

[src/command.ts:40](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L40)

___

### ArgsObject

Ƭ **ArgsObject**: `Record`\<`string` \| `number` \| `symbol`, `any`\>

#### Defined in

[src/command.ts:44](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L44)

___

### Runner

Ƭ **Runner**\<`Args`\>: (`options`: `Args`, `instance`: [`MassargCommand`](../classes/command.MassargCommand.md)\<`Args`\>) => `Promise`\<`void`\> \| `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Args` | extends [`ArgsObject`](command.md#argsobject) |

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

[src/command.ts:46](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L46)

## Functions

### CommandConfig

▸ **CommandConfig**\<`RunArgs`\>(`args`): `ZodObject`\<\{ `name`: `ZodString` ; `description`: `ZodString` ; `aliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `run`: `ZodType`\<[`Runner`](command.md#runner)\<`RunArgs`\>, `ZodTypeDef`, [`Runner`](command.md#runner)\<`RunArgs`\>\> ; `optionPrefix`: `ZodOptional`\<`ZodDefault`\<`ZodString`\>\> ; `aliasPrefix`: `ZodOptional`\<`ZodDefault`\<`ZodString`\>\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `run`: [`Runner`](command.md#runner)\<`RunArgs`\> ; `aliases?`: `string`[] ; `optionPrefix?`: `string` ; `aliasPrefix?`: `string`  }, \{ `name`: `string` ; `description`: `string` ; `run`: [`Runner`](command.md#runner)\<`RunArgs`\> ; `aliases?`: `string`[] ; `optionPrefix?`: `string` ; `aliasPrefix?`: `string`  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `RunArgs` | extends [`ArgsObject`](command.md#argsobject) = [`ArgsObject`](command.md#argsobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `ZodType`\<`RunArgs`, `ZodTypeDef`, `RunArgs`\> |

#### Returns

`ZodObject`\<\{ `name`: `ZodString` ; `description`: `ZodString` ; `aliases`: `ZodOptional`\<`ZodArray`\<`ZodString`, ``"many"``\>\> ; `run`: `ZodType`\<[`Runner`](command.md#runner)\<`RunArgs`\>, `ZodTypeDef`, [`Runner`](command.md#runner)\<`RunArgs`\>\> ; `optionPrefix`: `ZodOptional`\<`ZodDefault`\<`ZodString`\>\> ; `aliasPrefix`: `ZodOptional`\<`ZodDefault`\<`ZodString`\>\>  }, ``"strip"``, `ZodTypeAny`, \{ `name`: `string` ; `description`: `string` ; `run`: [`Runner`](command.md#runner)\<`RunArgs`\> ; `aliases?`: `string`[] ; `optionPrefix?`: `string` ; `aliasPrefix?`: `string`  }, \{ `name`: `string` ; `description`: `string` ; `run`: [`Runner`](command.md#runner)\<`RunArgs`\> ; `aliases?`: `string`[] ; `optionPrefix?`: `string` ; `aliasPrefix?`: `string`  }\>

#### Defined in

[src/command.ts:18](https://github.com/chenasraf/massarg/blob/fe2fc21/src/command.ts#L18)
