export interface CssCache {
  [key: string]: CssData
}

export interface CssData {
  defCount: number
  fontFaceCss: string
  iconCss: string
}

export type CssDefinition = string[]

export type CssDefinitions = { [key: string]: CssDefinition }

export interface CssProp {
  key: string
  value: string
}
