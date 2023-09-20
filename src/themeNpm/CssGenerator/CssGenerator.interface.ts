import { ThemeJson } from '../ThemeProcessor.interface'

export type CssDefinition = string[]

export type CssDefinitions = { [key: string]: CssDefinition }

export interface CssGeneratorInterface {
  /**
   * Take the data from the theme processor and create the css data.
   */
  processCss(themeData: ThemeJson): void
}

export interface CssProp {
  key: string
  value: string
}

export interface ProcessedCss {
  defCount: number
  fontCss: string
  iconCss: string
}
