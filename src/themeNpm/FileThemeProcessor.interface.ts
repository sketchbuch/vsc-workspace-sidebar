// See: https://github.com/microsoft/vscode/blob/main/src/vs/workbench/services/themes/browser/fileIconThemeData.ts
// Interfaces are not exported

export interface FileThemeProcessorObserver {
  /**
   * Inform this observer that the file theme has changed.
   */
  notify(): void
}

export interface ObserverableFileThemeProcessor {
  /**
   * Get cached theme data.
   */
  getThemeData(observer: FileThemeProcessorObserver): void

  /**
   * Subscribe to file theme changes.
   */
  subscribe(observer: FileThemeProcessorObserver): void

  /**
   * Unsubscribe to file theme changes.
   */
  unsubscribe(observer: FileThemeProcessorObserver): void
}

export interface GetThemeData {
  data: ThemeData | null
  localResourceRoots: string[]
  state: FileThemeProcessorState
  themeId: ThemeId
}

export type ThemeId = string | null

export type FileThemeProcessorState = 'loading' | 'error' | 'idle' | 'ready'

export interface ThemeCacheData {
  localResourceRoots: string[]
  themeData: ThemeData
  themeId: ThemeId
  timestamp: number
}

export interface ThemeSessionCacheData {
  [key: string]: ThemeCacheData
}

export type ThemeFontDefinitionSrc = { path: string; format: string }

export interface ThemeFontDefinition {
  id: string
  weight: string
  style: string
  size: string
  src: ThemeFontDefinitionSrc[]
}

export interface ThemeIconAssociation {
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
  showLanguageModeIcons?: boolean // Unset background image if true
}

export interface ThemeJsonIconDef {
  fontCharacter?: string
  fontColor?: string
  fontSize?: string
  iconPath?: string
  fontId: string // Used to match fonts in ThemeJson.fonts
}

export interface ThemeJsonIconDefs {
  [key: string]: ThemeJsonIconDef
}

export interface ThemeJsonIconMap {
  [key: string]: string
}
