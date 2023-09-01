export interface ThemeCacheData {
  themeData: ThemeData
  timestamp: number
}

export interface ThemeData {
  fileExtensions: ThemeJsonMap
  fileNames: ThemeJsonMap
  iconDefinitions: ThemeJsonIconDefs
  languageIds: ThemeJsonMap
}

// Just enough needed to get the data we want
export interface ThemeJson {
  fileExtensions: ThemeJsonMap
  fileNames: ThemeJsonMap
  iconDefinitions: ThemeJsonIconDefs
  languageIds: ThemeJsonMap
  light: {
    fileExtensions: ThemeJsonMap
    fileNames: ThemeJsonMap
    languageIds: ThemeJsonMap
  }
}

export interface ThemeJsonIconDefs {
  [key: string]: {
    fontCharacter: string
    fontColor: string
  }
}

export interface ThemeJsonMap {
  [key: string]: string
}
