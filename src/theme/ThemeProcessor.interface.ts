// See: https://github.com/microsoft/vscode/blob/main/src/vs/workbench/services/themes/browser/fileIconThemeData.ts
// Interfaces are not exported

export interface ThemeCacheData {
  themeData: ThemeData
  timestamp: number
}

export interface ThemeData {
  fileExtensions?: ThemeJsonMap
  fileNames?: ThemeJsonMap
  iconDefinitions: ThemeJsonIconDefs
  languageIds?: ThemeJsonMap
}

// Just enough needed to get the data we want
export interface ThemeJson {
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
