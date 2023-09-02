import * as fs from 'fs'
import * as os from 'os'
import path from 'path'
import * as vscode from 'vscode'
import { checkFile } from '../../utils/fs/checkFile'
import { isHiddenFile } from '../../utils/fs/isHiddenFile'

interface ThemeInfo {
  id: string
  label: string
  path: string
}

interface ExtThemeDataItem {
  extId: string
  extPath: string
  themeId: string
  themePath: string
}

type ExtThemeData = null | ExtThemeDataItem

export const getDefaultExtThemeData = (activeFileiconTheme: string): ExtThemeData => {
  let themeData: ExtThemeData = null

  try {
    for (const ext of vscode.extensions.all) {
      if (themeData !== null) {
        break
      }

      if (ext.packageJSON.contributes.iconThemes) {
        const iconThemes = ext.packageJSON.contributes.iconThemes as ThemeInfo[]

        for (const themeInfo of iconThemes) {
          if (activeFileiconTheme === themeInfo.id) {
            const extension = vscode.extensions.getExtension(ext.id)

            if (extension) {
              themeData = {
                extId: ext.id,
                extPath: extension.extensionPath,
                themeId: themeInfo.id,
                themePath: themeInfo.path,
              }
              break
            }
          }
        }
      }
    }
  } catch {
    // Just return themeData
  }

  return themeData
}

export const getUserExtThemeData = async (activeFileiconTheme: string): Promise<ExtThemeData> => {
  let themeData: ExtThemeData = null

  try {
    const USER_DIR = path.join(os.homedir(), '.vscode', 'extensions')
    const { isFolder } = checkFile(USER_DIR)

    if (isFolder) {
      const extFolders = await fs.promises.readdir(USER_DIR)

      for (const ext of extFolders) {
        if (themeData !== null) {
          break
        }

        if (!isHiddenFile(ext)) {
          const extPath = path.join(USER_DIR, ext)
          const packageJsonPath = path.join(extPath, 'package.json')
          const { isFile } = checkFile(packageJsonPath)

          if (isFile) {
            const packageJsonContent = await fs.promises.readFile(packageJsonPath, 'utf8')
            const packageJson = JSON.parse(packageJsonContent)

            if (packageJson.contributes && packageJson.contributes.iconThemes) {
              const iconThemes = packageJson.contributes.iconThemes as ThemeInfo[]

              for (const themeInfo of iconThemes) {
                if (activeFileiconTheme === themeInfo.id) {
                  themeData = {
                    extId: ext,
                    extPath,
                    themeId: themeInfo.id,
                    themePath: themeInfo.path,
                  }
                  break
                }
              }
            }
          }
        }
      }
    }
  } catch {
    // Just return themeData
  }

  return Promise.resolve(themeData)
}

export const getActiveExtThemeData = async (activeFileiconTheme: string): Promise<ExtThemeData> => {
  return (
    getDefaultExtThemeData(activeFileiconTheme) ?? (await getUserExtThemeData(activeFileiconTheme))
  )
}
