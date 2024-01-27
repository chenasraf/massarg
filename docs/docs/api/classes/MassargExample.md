---
id: "MassargExample"
title: "Class: MassargExample"
sidebar_label: "MassargExample"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new MassargExample**(`config`): [`MassargExample`](MassargExample.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `Object` | - |
| `config.description?` | `string` | Description of the example. This will appear as a title above the input/output line(s). |
| `config.input?` | `string` | Input of the example. This will appear as a line below the description, with a `$` prefix. The prefix can be changed using the `help()` function on the command. |
| `config.output?` | `string` | Output of the example. This will appear as a line below the input, with a `>` prefix. The prefix can be changed using the `help()` function on the command. |

#### Returns

[`MassargExample`](MassargExample.md)

#### Defined in

[src/example.ts:25](https://github.com/chenasraf/massarg/blob/48b3e64/src/example.ts#L25)

## Properties

### description

• **description**: `undefined` \| `string`

#### Defined in

[src/example.ts:21](https://github.com/chenasraf/massarg/blob/48b3e64/src/example.ts#L21)

___

### input

• **input**: `undefined` \| `string`

#### Defined in

[src/example.ts:22](https://github.com/chenasraf/massarg/blob/48b3e64/src/example.ts#L22)

___

### output

• **output**: `undefined` \| `string`

#### Defined in

[src/example.ts:23](https://github.com/chenasraf/massarg/blob/48b3e64/src/example.ts#L23)
