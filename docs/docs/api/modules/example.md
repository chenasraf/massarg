---
id: "example"
title: "Module: example"
sidebar_label: "example"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [MassargExample](../classes/example.MassargExample.md)

## Type Aliases

### ExampleConfig

Ƭ **ExampleConfig**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `description?` | `string` | Description of the example. This will appear as a title above the input/output line(s). |
| `input?` | `string` | Input of the example. This will appear as a line below the description, with a `$` prefix. The prefix can be changed using the `help()` function on the command. |
| `output?` | `string` | Output of the example. This will appear as a line below the input, with a `>` prefix. The prefix can be changed using the `help()` function on the command. |

#### Defined in

[src/example.ts:4](https://github.com/chenasraf/massarg/blob/fe2fc21/src/example.ts#L4)

[src/example.ts:18](https://github.com/chenasraf/massarg/blob/fe2fc21/src/example.ts#L18)

## Variables

### ExampleConfig

• `Const` **ExampleConfig**: `ZodObject`\<\{ `description`: `ZodOptional`\<`ZodString`\> ; `input`: `ZodOptional`\<`ZodString`\> ; `output`: `ZodOptional`\<`ZodString`\>  }, ``"strip"``, `ZodTypeAny`, \{ `description?`: `string` ; `input?`: `string` ; `output?`: `string`  }, \{ `description?`: `string` ; `input?`: `string` ; `output?`: `string`  }\>

#### Defined in

[src/example.ts:4](https://github.com/chenasraf/massarg/blob/fe2fc21/src/example.ts#L4)

[src/example.ts:18](https://github.com/chenasraf/massarg/blob/fe2fc21/src/example.ts#L18)
