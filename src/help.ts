import { format, StringStyle, stripColors } from './color'
import MassargCommand from './command'

export type GenerateTableCommandConfig = {
  maxRowLength?: number
  namePrefix?: string
  aliasPrefix?: string
  compact?: boolean
  nameStyle?: StringStyle
  descriptionStyle?: StringStyle
}

export type GenerateTableOptionConfig = GenerateTableCommandConfig & {
  typeStyle?: StringStyle
  defaultStyle?: StringStyle
}

export type GenerateHelpOptions = {
  // sub-styles
  commandOptions?: GenerateTableCommandConfig
  optionOptions?: GenerateTableOptionConfig

  // global styles
  titleStyle?: StringStyle
  descriptionStyle?: StringStyle
  subtitleStyle?: StringStyle
  usageStyle?: StringStyle
}

export type HelpItem = {
  name: string
  aliases: string[]
  description: string
}

export class HelpGenerator {
  entry: MassargCommand<any>
  config: GenerateHelpOptions

  constructor(entry: MassargCommand<any>, config?: GenerateHelpOptions) {
    this.entry = entry
    this.config = {
      commandOptions: {
        ...config?.commandOptions,
      },
      optionOptions: {
        ...config?.optionOptions,
      },
    }
  }

  generate(): string {
    const entry = this.entry
    const options = generateHelpTable(entry.options, {
      namePrefix: '--',
      aliasPrefix: '-',
      ...this.config.optionOptions,
    })
    const commands = generateHelpTable(entry.commands, {
      namePrefix: '',
      aliasPrefix: '',
      ...this.config.commandOptions,
    })

    return chainStr(
      format(entry.name, {
        bold: true,
        color: 'brightWhite',
        reset: true,
        ...this.config.titleStyle,
      }),
      '',
      format(entry.description, { reset: true, ...this.config.descriptionStyle }),
      commands.length && [
        '',
        format(`Commands for ${entry.name}:`, {
          bold: true,
          reset: true,
          color: 'brightWhite',
          underline: true,
          ...this.config.subtitleStyle,
        }),
        '',
        commands,
      ],
      options.length && [
        '',
        format(`Options for ${entry.name}:`, {
          bold: true,
          reset: true,
          color: 'brightWhite',
          underline: true,
          ...this.config.subtitleStyle,
        }),
        '',
        options,
      ],
    )
  }

  printHelp(): void {
    console.log(this.generate())
  }
}

function generateHelpTable<T extends Partial<GenerateTableCommandConfig>>(
  items: HelpItem[],
  {
    maxRowLength = 80,
    namePrefix = '',
    aliasPrefix = '',
    compact = false,
    ...config
  }: Partial<T> = {},
): string {
  const rows = items.map((o) => {
    const name = `${namePrefix}${o.name}${
      o.aliases.length ? ` | ${aliasPrefix}${o.aliases.join(`|${aliasPrefix}`)}` : ''
    }`
    const description = o.description
    return { name, description }
  })
  const maxNameLength = Math.max(...rows.map((o) => o.name.length))
  const nameStyle = (name: string) =>
    format(name, { bold: true, color: 'brightWhite', reset: true, ...config.nameStyle })
  const descStyle = (desc: string) =>
    format(desc, { color: 'gray', reset: true, ...config.descriptionStyle })
  const table = rows.map((row) => {
    const name = nameStyle(row.name.padEnd(maxNameLength + 2))
    const description = descStyle(row.description)
    const length = stripColors(name).length + stripColors(description).length
    if (length <= maxRowLength) {
      const line = `${name}${description}`
      if (!compact) {
        return `${line}\n`
      }
      return line
    }
    const subRows: string[] = []
    const words = description.split(' ')
    let currentRow = name

    for (const word of words) {
      if (stripColors(currentRow).length + stripColors(word).length + 1 > maxRowLength) {
        subRows.push(currentRow)
        currentRow = ' '.repeat(maxNameLength + 2)
      }
      currentRow += `${word} `
    }

    if (!compact) {
      subRows.push('')
    }

    return subRows.join('\n')
  })

  return table.join('\n')
}

type Parseable = string | number | boolean | Record<string, unknown>

function chainStr(...strs: (Parseable | Parseable[])[]) {
  const res: string[] = []
  for (const str of strs) {
    if (typeof str === 'string') {
      res.push(str)
      continue
    }
    if (Array.isArray(str)) {
      res.push(chainStr(...str))
      continue
    }
    if (typeof str === 'object') {
      for (const [key, value] of Object.entries(str)) {
        if (Boolean(value)) {
          res.push(key)
        }
      }
      continue
    }
    if (Boolean(str)) {
      res.push(str.toString())
      continue
    }
  }
  return res.join('\n')
}
