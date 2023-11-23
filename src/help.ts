import z from 'zod'
import { format, StringStyle, stripColors } from './color'
import MassargCommand from './command'
import { DeepRequired, strConcat, indent } from './utils'

export const GenerateTableCommandConfig = z.object({
  maxRowLength: z.number().optional(),
  namePrefix: z.string().optional(),
  aliasPrefix: z.string().optional(),
  compact: z.boolean().optional(),
  nameStyle: StringStyle.optional(),
  descriptionStyle: StringStyle.optional(),
})
export type GenerateTableCommandConfig = z.infer<typeof GenerateTableCommandConfig>

export const GenerateTableOptionConfig = GenerateTableCommandConfig
export type GenerateTableOptionConfig = z.infer<typeof GenerateTableOptionConfig>

export const HelpConfig = z.object({
  /**
   * Whether to bind the help command to this command
   *
   * Set this to `true` to automatically add a `help` command to this command's subcommands.
   */
  bindCommand: z.boolean().optional(),
  /**
   * Whether to bind the help option to this command
   *
   * Set this to `true` to automatically add a `--help` option to this command's options.
   */
  bindOption: z.boolean().optional(),

  commandOptions: GenerateTableCommandConfig.optional(),
  optionOptions: GenerateTableOptionConfig.optional(),
  titleStyle: StringStyle.optional(),
  descriptionStyle: StringStyle.optional(),
  subtitleStyle: StringStyle.optional(),
  usageStyle: StringStyle.optional(),
  maxRowLength: z.number().optional(),
  exampleStyles: z
    .object({
      description: StringStyle.optional(),
      input: StringStyle.optional(),
      output: StringStyle.optional(),
    })
    .optional(),
  usageText: z.string().optional(),
  headerText: z.string().optional(),
  footerText: z.string().optional(),
})

export type HelpConfig = z.infer<typeof HelpConfig>

export const defaultHelpConfig: DeepRequired<HelpConfig> = {
  maxRowLength: 80,
  commandOptions: {
    namePrefix: '',
    aliasPrefix: '',
    nameStyle: {
      color: 'yellow',
    },
    descriptionStyle: {
      color: 'gray',
    },
  },
  optionOptions: {
    namePrefix: '--',
    aliasPrefix: '-',
    nameStyle: {
      color: 'yellow',
    },
    descriptionStyle: {
      color: 'gray',
    },
  },
  descriptionStyle: {},
  exampleStyles: {
    description: {
      bold: true,
    },
    input: {
      color: 'yellow',
    },
    output: {
      color: 'brightWhite',
    },
  },
  bindCommand: false,
  bindOption: false,
  titleStyle: {
    bold: true,
    color: 'yellow',
  },
  usageStyle: {
    bold: true,
    color: 'yellow',
  },
  subtitleStyle: {
    bold: true,
    color: 'brightWhite',
    underline: true,
  },
  headerText: '',
  footerText: '',
  usageText: '',
}

export type HelpItem = {
  name: string
  aliases: string[]
  description: string
}

export class HelpGenerator {
  entry: MassargCommand<any>
  config: DeepRequired<HelpConfig>

  constructor(entry: MassargCommand<any>, config?: HelpConfig) {
    this.entry = entry
    this.config = HelpConfig.required().parse({
      ...entry.helpConfig,
      commandOptions: {
        ...entry.helpConfig?.commandOptions,
        ...config?.commandOptions,
      },
      optionOptions: {
        ...entry.helpConfig?.optionOptions,
        ...config?.optionOptions,
      },
    })
  }

  generate(): string {
    const entry = this.entry
    const CMD_OPT_INDENT = 4
    const _wrap = (text: string, indent = 0) => wrap(text, this.config.maxRowLength - indent)
    const options = generateHelpTable(entry.options, {
      ...this.config.optionOptions,
      maxRowLength:
        (this.config.optionOptions.maxRowLength ?? this.config.maxRowLength) - CMD_OPT_INDENT,
    })
    const commands = generateHelpTable(entry.commands, {
      ...this.config.commandOptions,
      maxRowLength:
        (this.config.commandOptions.maxRowLength ?? this.config.maxRowLength) - CMD_OPT_INDENT,
    })
    const examples = entry.examples
      .map((example) => {
        const { description, input, output } = example
        return strConcat(
          description && [_wrap(format(description, this.config.exampleStyles.description), 4), ''],
          input && _wrap(format('$ ' + input, this.config.exampleStyles.input), 4),
          output && _wrap(format('> ' + output, this.config.exampleStyles.output), 4),
        )
      })
      .join('\n')
    const { headerText, footerText, usageText } = this.config

    return (
      strConcat(
        _wrap(format(usageText || `Usage: ${entry.name} [...options]`, this.config.usageStyle)),
        headerText.length && ['', format(headerText, this.config.descriptionStyle)],
        '',
        _wrap(format(entry.description, this.config.descriptionStyle)),
        commands.length &&
          indent([
            '',
            format(`Commands for ${entry.name}:`, this.config.subtitleStyle),
            '',
            indent(commands),
          ]),
        options.length &&
          indent([
            '',
            format(`Options for ${entry.name}:`, this.config.subtitleStyle),
            '',
            indent(options),
          ]),
        examples.length &&
          indent(['', format('Examples:', this.config.subtitleStyle), '', indent(examples)]),
        footerText.length && ['', _wrap(format(footerText, this.config.descriptionStyle))],
      ) + '\n'
    )
  }

  printHelp(): void {
    console.log(this.generate())
  }
}

function wrap(text: string, maxRowLength: number): string {
  const length = stripColors(text).length
  if (length <= maxRowLength) {
    return text
  }
  const subRows: string[] = []
  const words = text.split(' ')
  let currentRow = ''
  console.log('words', words)

  for (const word of words) {
    if (stripColors(currentRow).length + stripColors(word).length + 1 > maxRowLength) {
      subRows.push(currentRow)
      currentRow = ''
    }
    currentRow += `${word} `
  }
  subRows.push(currentRow)

  return subRows.join('\n')
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
  const nameStyle = (name: string) => format(name, config.nameStyle)
  const descStyle = (desc: string) => format(desc, config.descriptionStyle)
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
