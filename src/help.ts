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
  /** Length of each row in the table */
  lineLength: z.number().optional(),
  /** When `false`, each row is separated by a blank line */
  compact: z.boolean().optional(),
  /** Style of the command/option name */
  nameStyle: StringStyle.optional(),
  /** Style of the command/option description */
  descriptionStyle: StringStyle.optional(),
  /** Prefix for the command/option name (default is the command's prefix) */
  namePrefix: z.string().optional(),
  /** Prefix for the command/option aliases (default is the command's prefix) */
  aliasPrefix: z.string().optional(),
})
export type GenerateTableCommandConfig = z.infer<typeof GenerateTableCommandConfig>

export const GenerateTableOptionConfig = GenerateTableCommandConfig.merge(
  z.object({
    /** Prefix for the command/option negations (default is the command's prefix) */
    negatePrefix: z.string().optional(),
    /** Prefix for the command/option negation aliases (default is the command's prefix) */
    negateAliasPrefix: z.string().optional(),
    /** Whether to display negations with each option name */
    displayNegations: z.boolean().optional(),
  }),
)
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

  /** Whether to align all tables to the column widths, or have each table be independent. Default is `true` */
  useGlobalTableColumns: z.boolean().default(true).optional(),

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
  usageStyle: z
    .object({
      /** Style of the help usage title - appears before the usage text (custom or auto) */
      prefix: StringStyle.optional(),
      /**
       * For custom usage text, this is the primary style used (right after the `prefix` style).
       * For automated usage text, this style is used for the command/binary name
       */
      main: StringStyle.optional(),
      /** Style of the help usage commands (if any) */
      command: StringStyle.optional(),
      /** Style of the help usage options (if any) */
      options: StringStyle.optional(),
    })
    .optional(),
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
  useGlobalTableColumns: true,
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
    displayNegations: false,
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
    prefix: {
      bold: true,
      color: 'brightWhite',
    },
    main: {
      color: 'yellow',
    },
    command: {
      color: 'gray',
    },
    options: {
      color: 'gray',
    },
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
    const optionOptions = {
      ...this.config.optionOptions,
      lineLength: this.config.lineLength - CMD_OPT_INDENT,
    }
    const commandOptions = {
      ...this.config.commandOptions,
      displayNegations: false,
      lineLength: this.config.lineLength - CMD_OPT_INDENT,
    }
    const maxNameLength = this.config.useGlobalTableColumns
      ? Math.max(
        getMaxNameLength(entry.options.map((e) => getItemDetails(e, optionOptions))),
        getMaxNameLength(entry.commands.map((e) => getItemDetails(e, commandOptions))),
      )
      : undefined
    const options = generateHelpTable(entry.options, optionOptions, maxNameLength).trimEnd()
    const commands = generateHelpTable(entry.commands, commandOptions, maxNameLength).trimEnd()
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
        )
      })
      .join('\n')
    const { headerText, footerText, usageText } = this.config

    return (
      strConcat(
        _wrap(
          usageText
            ? strConcat(
              format('Usage:', this.config.usageStyle.prefix),
              format(usageText, this.config.usageStyle.command),
            )
            : [
              format(`Usage:`, this.config.usageStyle.prefix),
              format(entry.name, this.config.usageStyle.main),
              commands.length && format('[command]', this.config.usageStyle.command),
              options.length && format('[options]', this.config.usageStyle.options),
            ]
              .filter(Boolean)
              .join(' '),
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

type ParsedHelpItem = {
  name: string
  description: string
  hidden: boolean
}

const getMaxNameLength = (items: ParsedHelpItem[]): number =>
  Math.max(...items.map((o) => o.name.length))

function getItemDetails(
  o: HelpItem,
  options?: Pick<
    GenerateTableOptionConfig & GenerateTableOptionConfig,
    'displayNegations' | 'namePrefix' | 'aliasPrefix' | 'negatePrefix' | 'negateAliasPrefix'
  >,
): ParsedHelpItem {
  const {
    displayNegations = false,
    namePrefix = '',
    negatePrefix = '',
    aliasPrefix = '',
    negateAliasPrefix = '',
  } = options ?? {}
  const cmdNames = {
    full: `${namePrefix}${o.name}`,
    fullNegated: negatePrefix ? `${negatePrefix}${o.name}` : undefined,
    aliases: o.aliases.map((a) => `${aliasPrefix}${a}`).join(' | '),
    aliasesNegated: negatePrefix
      ? o.aliases.map((a) => `${negateAliasPrefix}${a}`).join(' | ')
      : undefined,
  }
  const name = [
    cmdNames.full,
    cmdNames.aliases,
    displayNegations && cmdNames.fullNegated,
    displayNegations && cmdNames.aliasesNegated,
  ]
    .filter(Boolean)
    .join(' | ')
  const description = o.description
  const hidden = o.hidden || false
  return { name, description, hidden }
}

function generateHelpTable<T extends GenerateTableCommandConfig | GenerateTableOptionConfig>(
  items: HelpItem[],
  fullConfig: Partial<T> = {},
  maxNameLength?: number,
): string {
  const {
    lineLength = 80,
    namePrefix = '',
    aliasPrefix = '',
    negatePrefix = '',
    negateAliasPrefix = '',
    displayNegations = false,
    compact = false,
    ...config
  } = fullConfig as GenerateTableOptionConfig
  const rows = items
    .map((o) =>
      getItemDetails(o, {
        namePrefix,
        aliasPrefix,
        negatePrefix,
        negateAliasPrefix,
      }),
    )
    .filter((r) => !r.hidden)
  maxNameLength ??= getMaxNameLength(rows)
  const nameStyle = (name: string) => format(name, config.nameStyle)
  const descStyle = (desc: string) => format(desc, config.descriptionStyle)
  const table = rows.map((row) => {
    const name = nameStyle(row.name.padEnd(maxNameLength! + 2))
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
        currentRow = ' '.repeat(maxNameLength! + 2)
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
