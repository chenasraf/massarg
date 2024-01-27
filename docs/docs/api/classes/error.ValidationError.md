---
id: "error.ValidationError"
title: "Class: ValidationError"
sidebar_label: "ValidationError"
custom_edit_url: null
---

[error](../modules/error.md).ValidationError

This error is thrown when a validation fails.

## Hierarchy

- `Error`

  ↳ **`ValidationError`**

## Constructors

### constructor

• **new ValidationError**(`«destructured»`): [`ValidationError`](error.ValidationError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`ValidationErrorOptions`](../modules/error.md#validationerroroptions) |

#### Returns

[`ValidationError`](error.ValidationError.md)

#### Overrides

Error.constructor

#### Defined in

[src/error.ts:14](https://github.com/chenasraf/massarg/blob/fe2fc21/src/error.ts#L14)

## Properties

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/.pnpm/@types+node@20.11.5/node_modules/@types/node/globals.d.ts:28

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/.pnpm/@types+node@20.11.5/node_modules/@types/node/globals.d.ts:30

___

### path

• **path**: `string`[]

The path to the value that failed validation.

#### Defined in

[src/error.ts:8](https://github.com/chenasraf/massarg/blob/fe2fc21/src/error.ts#L8)

___

### code

• **code**: `string`

The error code.

#### Defined in

[src/error.ts:10](https://github.com/chenasraf/massarg/blob/fe2fc21/src/error.ts#L10)

___

### message

• **message**: `string`

The error message.

#### Overrides

Error.message

#### Defined in

[src/error.ts:12](https://github.com/chenasraf/massarg/blob/fe2fc21/src/error.ts#L12)

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

docs/node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:1067

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

docs/node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es5.d.ts:1069

___

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

docs/node_modules/.pnpm/typescript@5.2.2/node_modules/typescript/lib/lib.es2022.error.d.ts:24

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/.pnpm/@types+node@20.11.5/node_modules/@types/node/globals.d.ts:21
