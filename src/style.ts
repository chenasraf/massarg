import z from 'zod'
import { zodEnumFromObjKeys } from './utils'

export const ansiStyles = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  underline: '\x1b[4m',
  black: '\x1b[30m',
}

export const ansiColors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m', // warning
  blue: '\x1b[34m',
  magenta: '\x1b[35m', // error
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  grey: '\x1b[90m',
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m',
}

export const StringStyle = z.object({
  bold: z.boolean().optional(),
  underline: z.boolean().optional(),
  color: zodEnumFromObjKeys(ansiColors).optional(),
  reset: z.boolean().default(true).optional(),
})

export type StringStyle = z.infer<typeof StringStyle>

export function format(string: string, style: StringStyle = {}): string {
  const { color, bold, underline, reset = true } = style
  const colorCode = color ? ansiColors[color] : ''
  const boldCode = bold ? ansiStyles.bold : ''
  const underlineCode = underline ? ansiStyles.underline : ''
  const resetCode = reset ? ansiStyles.reset : ''
  return `${colorCode}${boldCode}${underlineCode}${string}${resetCode}`
}

export function stripStyle(string: string): string {
  return string.replace(/\x1b\[\d+m/gi, '')
}
