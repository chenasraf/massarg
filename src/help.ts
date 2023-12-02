import z from 'zod'
import { format, StringStyle, stripStyle } from './style'
import { MassargCommand } from './command'
import { DeepRequired, strConcat, indent, deepMerge } from './utils'
import {
  NEGATE_FULL_PREFIX,
  NEGATE_SHORT_PREFIX,
  OPT_FULL_PREFIX,
  OPT_SHORT_PREFIX,
} from './option'

export const GenerateTableCommandConfig = z.object({
  lineLength: z.number().optional(),
  compact: z.boolean().optional(),
  nameStyle: StringStyle.optional(),
  descriptionStyle: StringStyle.optional(),
  namePrefix: z.string().optional(),
  aliasPrefix: z.string().optional(),
  negatePrefix: z.string().optional(),
  negateAliasPrefix: z.string().optional(),
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

  /** Options for generating the table of commands */
  commandOptions: GenerateTableCommandConfig.omit({ lineLength: true }).optional(),
  /** Options for generating the table of options */
  optionOptions: GenerateTableOptionConfig.omit({ lineLength: true }).optional(),
  /** Style of the help title */
  titleStyle: StringStyle.optional(),
  /** Style of the help description */
  descriptionStyle: StringStyle.optional(),
  /** Style of the help subtitles for commands, options and examples */
  subtitleStyle: StringStyle.optional(),
  /** Style of the help usage */
  usageStyle: StringStyle.optional(),
  /** Style of the help header */
  headerStyle: StringStyle.optional(),
  /** Style of the help footer */
  footerStyle: StringStyle.optional(),
  /** Maximum length of a row in the help output */
  lineLength: z.number().optional(),
  /** Options for examples section */
  exampleOptions: z
    .object({
      /** Style of the example description */
      descriptionStyle: StringStyle.optional(),
      /** Style of the example input */
      inputStyle: StringStyle.optional(),
      /** Style of the example output */
      outputStyle: StringStyle.optional(),
      /** Prefix for the example input (default: `$`) */
      inputPrefix: z.string().default('$').optional(),
      /** Prefix for the example output (default: `>`) */
      outputPrefix: z.string().default('>').optional(),
    })
    .optional(),
  /** Text to display at the very top, describing CLI usage */
  usageText: z.string().optional(),
  /** Text to display above the description, below the usage */
  headerText: z.string().optional(),
  /** Text to display at the very bottom, below the examples */
  footerText: z.string().optional(),
})

export type HelpConfig = z.infer<typeof HelpConfig>

export const defaultHelpConfig: DeepRequired<HelpConfig> = {
  lineLength: 80,
  commandOptions: {
    nameStyle: {
      color: 'yellow',
    },
    descriptionStyle: {
      color: 'gray',
    },
  },
  optionOptions: {
    namePrefix: OPT_FULL_PREFIX,
    aliasPrefix: OPT_SHORT_PREFIX,
    negatePrefix: NEGATE_FULL_PREFIX,
    negateAliasPrefix: NEGATE_SHORT_PREFIX,
    nameStyle: {
      color: 'yellow',
    },
    descriptionStyle: {
      color: 'gray',
    },
  },
  descriptionStyle: {},
  exampleOptions: {
    descriptionStyle: {
      bold: true,
      color: 'brightWhite',
    },
    inputStyle: {
      color: 'yellow',
    },
    outputStyle: {
      color: 'brightWhite',
    },
    inputPrefix: '$',
    outputPrefix: '>',
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
  headerStyle: {},
  footerStyle: {},
}

export type HelpItem = {
  name: string
  aliases: string[]
  description: string
  hidden?: boolean
}

export class HelpGenerator {
  entry: MassargCommand<any>
  config: DeepRequired<HelpConfig>

  constructor(entry: MassargCommand<any>, config?: HelpConfig) {
    this.entry = entry
    this.config = HelpConfig.required().parse(deepMerge(entry.helpConfig, config))
  }

  generate(): string {
    const entry = this.entry
    const CMD_OPT_INDENT = 4
    const _wrap = (text: string, indent = 0) => wrap(text, this.config.lineLength - indent)
    const options = generateHelpTable(entry.options, {
      ...this.config.optionOptions,
      lineLength: this.config.lineLength - CMD_OPT_INDENT,
    }).trimEnd()
    const commands = generateHelpTable(entry.commands, {
      ...this.config.commandOptions,
      lineLength: this.config.lineLength - CMD_OPT_INDENT,
    }).trimEnd()
    const examples = entry.examples
      .map((example) => {
        const { description, input, output } = example
        return strConcat(
          description && [
            _wrap(format(description, this.config.exampleOptions.descriptionStyle), 4),
          ],
          input &&
          _wrap(
            format(
              [this.config.exampleOptions.inputPrefix, input].filter(Boolean).join(' '),
              this.config.exampleOptions.inputStyle,
            ),
            4,
          ),
          output &&
          _wrap(
            format(
              [this.config.exampleOptions.outputPrefix, output].filter(Boolean).join(' '),
              this.config.exampleOptions.outputStyle,
            ),
            4,
          ),
          '',
        )
      })
      .join('\n')
    const { headerText, footerText, usageText } = this.config

    return (
      strConcat(
        _wrap(
          format(
            usageText ||
            [`Usage:`, entry.name, commands.length && '[command]', options.length && '[options]']
              .filter(Boolean)
              .join(' '),
            this.config.usageStyle,
          ),
        ),
        headerText.length && ['', format(headerText, this.config.descriptionStyle)],
        entry.description.length && [
          '',
          _wrap(format(entry.description, this.config.descriptionStyle)),
        ],
        commands.length &&
        indent([
          '',
          format(
            entry.parent ? `Commands for ${entry.name}:` : 'Commands:',
            this.config.subtitleStyle,
          ),
          '',
          indent(commands),
        ]),
        options.length &&
        indent([
          '',
          format(
            entry.parent ? `Options for ${entry.name}:` : 'Options:',
            this.config.subtitleStyle,
          ),
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

function wrap(text: string, lineLength: number): string {
  const length = stripStyle(text).length
  if (length <= lineLength) {
    return text
  }
  const subRows: string[] = []
  const words = text.split(' ')
  let currentRow = ''

  for (const word of words) {
    if (stripStyle(currentRow).length + stripStyle(word).length + 1 > lineLength) {
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
    lineLength: lineLength = 80,
    namePrefix = '',
    negatePrefix = '',
    aliasPrefix = '',
    negateAliasPrefix: aliasNegatePrefix = '',
    compact = false,
    ...config
  }: Partial<T> = {},
): string {
  const rows = items
    .map((o) => {
      const cmdNames = {
        full: `${namePrefix}${o.name}`,
        fullNegated: negatePrefix ? `${negatePrefix}${o.name}` : undefined,
        aliases: o.aliases.map((a) => `${aliasPrefix}${a}`).join(' | '),
        aliasesNegated: negatePrefix
          ? o.aliases.map((a) => `${aliasNegatePrefix}${a}`).join(' | ')
          : undefined,
      }
      const name = [
        cmdNames.full,
        cmdNames.aliases,
        // cmdNames.fullNegated,
        // cmdNames.aliasesNegated,
      ]
        .filter(Boolean)
        .join(' | ')
      const description = o.description
      const hidden = o.hidden || false
      return { name, description, hidden }
    })
    .filter((r) => !r.hidden)
  const maxNameLength = Math.max(...rows.map((o) => o.name.length))
  const nameStyle = (name: string) => format(name, config.nameStyle)
  const descStyle = (desc: string) => format(desc, config.descriptionStyle)
  const table = rows.map((row) => {
    const name = nameStyle(row.name.padEnd(maxNameLength + 2))
    const description = descStyle(row.description)
    const length = stripStyle(name).length + stripStyle(description).length
    if (length <= lineLength) {
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
      if (stripStyle(currentRow).length + stripStyle(word).length + 1 > lineLength) {
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
