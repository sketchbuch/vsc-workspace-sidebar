export type CssDefinition = string[]

export type CssDefinitions = { [key: string]: CssDefinition }

export interface CssProp {
  key: string
  value: string
}

export interface ProcessedCss {
  defCount: number
  fontFaceCss: string
  iconCss: string
}
