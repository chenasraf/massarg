---
id: "utils"
title: "Module: utils"
sidebar_label: "utils"
sidebar_position: 0
custom_edit_url: null
---

## Type Aliases

### DeepRequired

Ƭ **DeepRequired**\<`T`\>: \{ [P in keyof T]-?: T[P] extends object ? DeepRequired\<T[P]\> : NonNullable\<T[P]\> }

A type that makes all properties of an object required, recursively.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/utils.ts:17](https://github.com/chenasraf/massarg/blob/48b3e64/src/utils.ts#L17)

## Functions

### strConcat

▸ **strConcat**(`...strs`): `string`

Concatenates strings, arrays of strings, and objects with truthy values.

It works recursively, so adding an array of strings to an array of strings will work.

Falsy values are ignored, so pasing `undefined` or `null` will not add anything to the result,
and using a boolean will only add it if it is `true`. Using 0 will also not add anything.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...strs` | (`Parseable` \| `Parseable`[])[] |

#### Returns

`string`

#### Defined in

[src/utils.ts:29](https://github.com/chenasraf/massarg/blob/48b3e64/src/utils.ts#L29)

___

### indent

▸ **indent**(`str`, `indent?`): `string`

Indents a string or an array of strings. Concatenates them all using `strConcat`.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `str` | `Parseable` \| `Parseable`[] | `undefined` |
| `indent` | `number` | `2` |

#### Returns

`string`

#### Defined in

[src/utils.ts:62](https://github.com/chenasraf/massarg/blob/48b3e64/src/utils.ts#L62)

___

### capitalize

▸ **capitalize**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[src/utils.ts:90](https://github.com/chenasraf/massarg/blob/48b3e64/src/utils.ts#L90)

___

### splitWords

▸ **splitWords**(`str`): `string`[]

Splits a name into words, using camelCase, PascalCase, snake_case, and kebab-case or
regular spaced strings.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`[]

#### Defined in

[src/utils.ts:98](https://github.com/chenasraf/massarg/blob/48b3e64/src/utils.ts#L98)

___

### toCamelCase

▸ **toCamelCase**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[src/utils.ts:110](https://github.com/chenasraf/massarg/blob/48b3e64/src/utils.ts#L110)

___

### toPascalCase

▸ **toPascalCase**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[src/utils.ts:116](https://github.com/chenasraf/massarg/blob/48b3e64/src/utils.ts#L116)

___

### getErrorMessage

▸ **getErrorMessage**(`err`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `unknown` |

#### Returns

`string`

#### Defined in

[src/utils.ts:122](https://github.com/chenasraf/massarg/blob/48b3e64/src/utils.ts#L122)
