---
id: "error"
title: "Module: error"
sidebar_label: "error"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [ValidationError](../classes/error.ValidationError.md)
- [ParseError](../classes/error.ParseError.md)

## Type Aliases

### ValidationErrorOptions

Ƭ **ValidationErrorOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `path` | `string`[] |
| `code` | `string` |
| `message` | `string` |

#### Defined in

[src/error.ts:3](https://github.com/chenasraf/massarg/blob/fe2fc21/src/error.ts#L3)

___

### ParseErrorOptions

Ƭ **ParseErrorOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `path` | `string`[] |
| `code` | `string` |
| `message` | `string` |
| `received?` | `unknown` |

#### Defined in

[src/error.ts:24](https://github.com/chenasraf/massarg/blob/fe2fc21/src/error.ts#L24)

## Functions

### isZodError

▸ **isZodError**(`e`): e is ZodError\<any\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `unknown` |

#### Returns

e is ZodError\<any\>

#### Defined in

[src/error.ts:56](https://github.com/chenasraf/massarg/blob/fe2fc21/src/error.ts#L56)
