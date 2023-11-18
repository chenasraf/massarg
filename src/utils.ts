import { z } from "zod"
import MassargCommand from "./command"
import MassargOption from "./option"

export function isZodError(e: unknown): e is z.ZodError {
  return e instanceof z.ZodError
}

type GenerateTableOptions = {
  maxRowLength?: number
  namePrefix?: string
  aliasPrefix?: string
}

/** generates an aligned table of options and their descriptions */
export function generateHelpTable(
  items: { name: string; aliases: string[]; description: string }[],
  { maxRowLength = 80, namePrefix = "", aliasPrefix = "" }: GenerateTableOptions = {},
): string {
  const rows = items.map((o) => {
    const name = `${namePrefix}${o.name}${
      o.aliases.length ? ` | ${aliasPrefix}${o.aliases.join(`|${aliasPrefix}`)}` : ""
    }`
    const description = o.description
    return { name, description }
  })
  const maxNameLength = Math.max(...rows.map((o) => o.name.length))
  const table = rows.map((row) => {
    const name = row.name.padEnd(maxNameLength + 2)
    const description = row.description
    const length = name.length + description.length
    if (length <= maxRowLength) {
      return `${name}${description}`
    }
    const subRows: string[] = [name]
    const words = description.split(" ")
    let currentRow = subRows[0]

    for (const word of words) {
      if (currentRow.length + word.length + 1 > maxRowLength) {
        subRows.push(currentRow)
        currentRow = ""
      }
      currentRow += `${word} `
    }

    return subRows.join("\n")
  })

  return table.join("\n")
}

export function generateOptionsHelpTable(options: MassargOption<unknown>[], config?: GenerateTableOptions): string {
  return generateHelpTable(options, {
    namePrefix: "--",
    aliasPrefix: "-",
    ...config,
  })
}

export function generateCommandsHelpTable(commands: MassargCommand[], config?: GenerateTableOptions): string {
  return generateHelpTable(commands, {
    namePrefix: "",
    aliasPrefix: "",
    ...config,
  })
}
