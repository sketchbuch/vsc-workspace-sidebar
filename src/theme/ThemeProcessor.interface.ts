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
  localResourceRoots: string[]
  state: ThemeProcessorState
  themeId: string | null
}

export type ThemeProcessorState = 'loading' | 'error' | 'idle' | 'data-ready'

export interface ThemeCacheData {
  localResourceRoots: string[]
  themeData: ThemeData
  themeId: string
  timestamp: number
}

export type ThemeFontDefinitionSrc = { path: string; format: string }

export interface ThemeFontDefinition {
  id: string
  weight: string
  style: string
  size: string
  src: ThemeFontDefinitionSrc[]
}

interface ThemeIconAssociation {
  file?: ThemeJsonIconSingle // Icon for file
  fileExtensions?: ThemeJsonIconMap // Icons for file extensions
  fileNames?: ThemeJsonIconMap // Icons for filenames
  folder?: ThemeJsonIconSingle // Icon for folder
  folderExpanded?: ThemeJsonIconSingle // Icons for open folder
  folderNames?: ThemeJsonIconMap // Icons for specfic named folders
  folderNamesExpanded?: ThemeJsonIconMap // Icons for open specfic named folders
  languageIds?: ThemeJsonIconMap // Icons for specific languages
  rootFolder?: ThemeJsonIconSingle // Icon for root folder
  rootFolderExpanded?: ThemeJsonIconSingle // Icon for open root folder
}

export type ThemeData = ThemeJson

export type ThemeJsonIconSingle = string | undefined

export interface ThemeJson extends ThemeIconAssociation {
  fonts: ThemeFontDefinition[]
  hidesExplorerArrows?: boolean
  highContrast?: ThemeIconAssociation
  iconDefinitions: ThemeJsonIconDefs
  light?: ThemeIconAssociation

  // Not supported, no fall back to default laguage icon
  showLanguageModeIcons?: boolean // https://code.visualstudio.com/api/extension-guides/file-icon-theme
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

export interface ThemeJsonIconMap {
  [key: string]: string
}
