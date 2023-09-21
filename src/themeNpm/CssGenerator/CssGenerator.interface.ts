import { ThemeJson } from '../FileThemeProcessor.interface'

export type CssDefinition = string[]

export type CssDefinitions = { [key: string]: CssDefinition }

export interface CssGeneratorInterface {
  /**
   * Take the data from the theme processor and create the css for the theme.
   */
  getCss(themeData: ThemeJson, themeId: string): void
}

export interface CssProp {
  key: string
  value: string
}

export interface ProcessedCss {
  defCount: number
  fontFaceCss: string
  iconCss: string
}
