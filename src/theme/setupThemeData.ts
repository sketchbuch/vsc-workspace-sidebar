import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode'
import { EXT } from '../constants/ext'
import { getTimestamp } from '../utils/datetime/getTimestamp'
import { WorkspaceViewProvider } from '../webviews/Workspace/WorkspaceViewProvider'
import { getActiveExtThemeData } from './getActiveExtThemeData'

interface ThemeJsonIconDefs {
  [key: string]: {
    fontCharacter: string
    fontColor: string
  }
}

interface ThemeJsonMap {
  [key: string]: string
}

// Just enough needed to get the data we want
interface ThemeJson {
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

export interface ThemeData {
  fileExtensions: ThemeJsonMap
  fileNames: ThemeJsonMap
  iconDefinitions: ThemeJsonIconDefs
  languageIds: ThemeJsonMap
}

export interface ThemeCache {
  themeData: ThemeData
  timestamp: number
}

export const THEME_CACHE_KEY = `${EXT}-theme-cache`
export const THEME_CACHE_DURATION = 259200 // 72 Hours

export const isLightTheme = (activeTheme: vscode.ColorTheme): boolean => {
  return activeTheme.kind === 1 || activeTheme.kind === 4
}

/**
 * If there is an error, we ignore it and just render the old icons
 */
export const processThemeData = async (
  context: vscode.ExtensionContext,
  workspaceViewProvider: WorkspaceViewProvider
) => {
  const activeFileiconTheme = vscode.workspace.getConfiguration('workbench').iconTheme
  const activeExtThemeData = await getActiveExtThemeData(activeFileiconTheme)

  if (activeExtThemeData !== null) {
    const themePath = path.join(activeExtThemeData.extPath, activeExtThemeData.themePath)

    try {
      const isLight = isLightTheme(vscode.window.activeColorTheme)
      const jsonContent = fs.readFileSync(themePath, 'utf8')
      const jsonData = JSON.parse(jsonContent) as ThemeJson

      const themeCacheData: ThemeCache = {
        themeData: {
          iconDefinitions: jsonData.iconDefinitions,
          fileExtensions: isLight ? jsonData.light.fileExtensions : jsonData.fileExtensions,
          fileNames: isLight ? jsonData.light.fileNames : jsonData.fileNames,
          languageIds: isLight ? jsonData.light.languageIds : jsonData.languageIds,
        },
        timestamp: getTimestamp(),
      }

      context.globalState.update(THEME_CACHE_KEY, themeCacheData)
    } catch {
      if (context.extensionMode !== vscode.ExtensionMode.Production) {
        vscode.window.showErrorMessage('Unable to process theme json')
      }
    }
  } else if (context.extensionMode !== vscode.ExtensionMode.Production) {
    vscode.window.showErrorMessage('Active theme not found')
  }
}

export const setupThemeData = (
  context: vscode.ExtensionContext,
  workspaceViewProvider: WorkspaceViewProvider
) => {
  processThemeData(context, workspaceViewProvider)

  const configChange = vscode.workspace.onDidChangeConfiguration(
    (event: vscode.ConfigurationChangeEvent) => {
      const { affectsConfiguration } = event

      /* if (affectsConfiguration(`${WORKBENCH_CONFIG}.iconTheme`)) {
        processThemeData(context, workspaceViewProvider)
      } */
    }
  )

  context.subscriptions.push(configChange)
}
