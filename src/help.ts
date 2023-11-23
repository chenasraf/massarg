import z from 'zod'
import { format, StringStyle, stripColors } from './color'
import MassargCommand from './command'
import { chainStr, indent } from './utils'

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
})

export type HelpConfig = z.infer<typeof HelpConfig>

export const defaultHelpConfig: HelpConfig = {
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
}

export type HelpItem = {
  name: string
  aliases: string[]
  description: string
}

export class HelpGenerator {
  entry: MassargCommand<any>
  config: HelpConfig

  constructor(entry: MassargCommand<any>, config?: HelpConfig) {
    this.entry = entry
    this.config = HelpConfig.parse({
      commandOptions: {
        ...config?.commandOptions,
      },
      optionOptions: {
        ...config?.optionOptions,
      },
    })
  }

  generate(): string {
    const entry = this.entry
    const options = generateHelpTable(entry.options, this.config.optionOptions)
    const commands = generateHelpTable(entry.commands, this.config.commandOptions)
    const examples = entry.examples
      .map((example) => {
        const { description, input, output } = example
        return chainStr(
          description && [format(description, this.config.exampleStyles?.description), ''],
          input && format(input, this.config.exampleStyles?.input),
          output && format(output, this.config.exampleStyles?.output),
        )
      })
      .join('\n')

    return (
      chainStr(
        format(`Usage: ${entry.name} [...options]`, this.config.usageStyle),
        '',
        format(entry.description, this.config.descriptionStyle),
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
      ) + '\n'
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
    const name = `${namePrefix}${o.name}${o.aliases.length ? ` | ${aliasPrefix}${o.aliases.join(`|${aliasPrefix}`)}` : ''
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
