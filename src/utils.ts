import chalk from "chalk"
// import chunk from "lodash/chunk"
import repeat from "lodash/repeat"
import merge from "lodash/merge"

export function color(color: keyof typeof chalk, ...text: any[]): string {
  return chalk.reset((chalk[color] as typeof chalk.dim)(...text))
}

export interface WrapOptions {
  indent?: number
  firstLineIndent?: number
  printWidth?: number
  colorCount?: number
}

export function wrap(text: string, options?: WrapOptions): string[] {
  const _opts = merge(
    {
      printWidth: 100,
      indent: 0,
      colorCount: 0,
    } as WrapOptions,
    options
  ) as Required<WrapOptions>

  const indentSize = _opts.indent ?? 0
  const firstIndentSize = _opts.firstLineIndent ?? indentSize
  const maxLineLength = _opts.printWidth - firstIndentSize + COLOR_CODE_LEN * _opts.colorCount

  function indent(i: number, l: string): string {
    const INDENT_FIX = -2
    return repeat(" ", i === 0 ? firstIndentSize : indentSize) + l
  }

  if (!_opts.printWidth || maxLineLength <= 0) {
    return text.split("\n").map((l, i) => indent(i, l))
  }

  let lines = chunk(text, maxLineLength).map((l, i) => indent(i, l))

  lines = [
    lines[0],
    ...chunk(
      lines
        .slice(1)
        .map((l) => l.trim())
        .join(" ")
        .trim(),
      maxLineLength - indentSize - COLOR_CODE_LEN
    ).map((l, i) => indent(i + 1, l)),
  ].filter((l) => l.trim().length)

  return lines
}

export const COLOR_CODE_LEN = chalk.yellow` `.length - 1

function chunk(text: string, len: number): string[] {
  const arr = text.split(" ")
  const result = []
  let subStr = arr[0]
  for (let i = 1; i < arr.length; i++) {
    let word = arr[i]
    if (subStr.length + word.length + 1 <= len) {
      subStr = subStr + " " + word
    } else {
      result.push(subStr)
      subStr = word
    }
  }
  if (subStr.length) {
    result.push(subStr)
  }
  return result
}
