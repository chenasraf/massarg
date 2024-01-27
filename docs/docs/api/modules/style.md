---
id: "style"
title: "Module: style"
sidebar_label: "style"
sidebar_position: 0
custom_edit_url: null
---

## References

### strConcat

Re-exports [strConcat](utils.md#strconcat-8)

___

### indent

Re-exports [indent](utils.md#indent-8)

## Type Aliases

### StringStyle

Ƭ **StringStyle**: `z.infer`\<typeof [`StringStyle`](style.md#stringstyle-16)\>

#### Defined in

[src/style.ts:31](https://github.com/chenasraf/massarg/blob/48b3e64/src/style.ts#L31)

[src/style.ts:38](https://github.com/chenasraf/massarg/blob/48b3e64/src/style.ts#L38)

## Variables

### ansiStyles

• `Const` **ansiStyles**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `reset` | `string` |
| `bold` | `string` |
| `underline` | `string` |
| `black` | `string` |

#### Defined in

[src/style.ts:5](https://github.com/chenasraf/massarg/blob/48b3e64/src/style.ts#L5)

___

### ansiColors

• `Const` **ansiColors**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `red` | `string` |
| `green` | `string` |
| `yellow` | `string` |
| `blue` | `string` |
| `magenta` | `string` |
| `cyan` | `string` |
| `white` | `string` |
| `gray` | `string` |
| `grey` | `string` |
| `brightRed` | `string` |
| `brightGreen` | `string` |
| `brightYellow` | `string` |
| `brightBlue` | `string` |
| `brightMagenta` | `string` |
| `brightCyan` | `string` |
| `brightWhite` | `string` |

#### Defined in

[src/style.ts:12](https://github.com/chenasraf/massarg/blob/48b3e64/src/style.ts#L12)

___

### StringStyle

• `Const` **StringStyle**: `ZodObject`\<\{ `bold`: `ZodOptional`\<`ZodBoolean`\> ; `underline`: `ZodOptional`\<`ZodBoolean`\> ; `color`: `ZodOptional`\<`ZodEnum`\<[``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"``, ...("red" \| "green" \| "yellow" \| "blue" \| "magenta" \| "cyan" \| "white" \| "gray" \| "grey" \| "brightRed" \| "brightGreen" \| "brightYellow" \| "brightBlue" \| "brightMagenta" \| "brightCyan" \| "brightWhite")[]]\>\> ; `reset`: `ZodOptional`\<`ZodDefault`\<`ZodBoolean`\>\>  }, ``"strip"``, `ZodTypeAny`, \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  }, \{ `bold?`: `boolean` ; `underline?`: `boolean` ; `color?`: ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` ; `reset?`: `boolean`  }\>

#### Defined in

[src/style.ts:31](https://github.com/chenasraf/massarg/blob/48b3e64/src/style.ts#L31)

[src/style.ts:38](https://github.com/chenasraf/massarg/blob/48b3e64/src/style.ts#L38)

## Functions

### format

▸ **format**(`string`, `style?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |
| `style` | `Object` |
| `style.bold?` | `boolean` |
| `style.underline?` | `boolean` |
| `style.color?` | ``"red"`` \| ``"green"`` \| ``"yellow"`` \| ``"blue"`` \| ``"magenta"`` \| ``"cyan"`` \| ``"white"`` \| ``"gray"`` \| ``"grey"`` \| ``"brightRed"`` \| ``"brightGreen"`` \| ``"brightYellow"`` \| ``"brightBlue"`` \| ``"brightMagenta"`` \| ``"brightCyan"`` \| ``"brightWhite"`` |
| `style.reset?` | `boolean` |

#### Returns

`string`

#### Defined in

[src/style.ts:40](https://github.com/chenasraf/massarg/blob/48b3e64/src/style.ts#L40)

___

### stripStyle

▸ **stripStyle**(`string`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |

#### Returns

`string`

#### Defined in

[src/style.ts:49](https://github.com/chenasraf/massarg/blob/48b3e64/src/style.ts#L49)
