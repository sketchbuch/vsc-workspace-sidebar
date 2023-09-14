// See: https://github.com/microsoft/vscode/blob/main/src/vs/workbench/services/themes/browser/fileIconThemeData.ts
// Interfaces are not exported

export interface ThemeProcessorObserver {
  notify(): void
}

export interface ObserverableThemeProcessor {
  subscribe(observer: ThemeProcessorObserver): void
  unsubscribe(observer: ThemeProcessorObserver): void

  // Observerable should have this private method
  // notifyAll(): void
}

export interface GetThemeData {
  data: ThemeData | null
  state: ThemeProcessorState
  themeId: string | null
}

export type ThemeProcessorState = 'loading' | 'error' | 'idle' | 'data-ready'

export interface ThemeCacheData {
  themeData: ThemeData
  themeId: string
  timestamp: number
}

export type ThemeFontDefinitionSrc = { path: string; format: string }

interface ThemeFontDefinition {
  id: string
  weight: string
  style: string
  size: string
  src: ThemeFontDefinitionSrc[]
}

export interface ThemeData {
  fonts: ThemeFontDefinition[]
  fileExtensions?: ThemeJsonMap
  fileNames?: ThemeJsonMap
  iconDefinitions: ThemeJsonIconDefs
  languageIds?: ThemeJsonMap
}

// Just enough needed to get the data we want
export interface ThemeJson {
  fonts: ThemeFontDefinition[]
  fileExtensions?: ThemeJsonMap
  fileNames?: ThemeJsonMap
  iconDefinitions: ThemeJsonIconDefs
  languageIds?: ThemeJsonMap
  light: {
    fileExtensions?: ThemeJsonMap
    fileNames?: ThemeJsonMap
    languageIds?: ThemeJsonMap
  }
}

export interface ThemeJsonIconDef {
  fontCharacter?: string
  fontColor?: string
  fontSize?: string
  iconPath?: string

  // Not sure what this is so leave unsupported for now...
  //fontId: string;
}

export interface ThemeJsonIconDefs {
  [key: string]: ThemeJsonIconDef
}

export interface ThemeJsonMap {
  [key: string]: string
}
