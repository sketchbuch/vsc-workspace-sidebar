import * as os from 'os'
import * as vscode from 'vscode'
import { getFoldersConfig } from '../../../config/folders'
import { isWindows } from '../../../utils/os/isWindows'
import { getConfigFolderStructure } from './getConfigFolderStructure'

/* type FolderCounts = Record<string, number>

const MAX_COUNT = 50 */

const processPath = (path: string, isWin: boolean, homeDir: string): string => {
  if (isWin) {
    const winDriveLetterRegex = /^([A-Z]):/

    return path.replace(winDriveLetterRegex, (match) => match.toLowerCase())
  }

  return path.replace(homeDir, `~`).replace('/~', `~`)
}

export const getNewRootFolderConfig = (wsFolders: vscode.WorkspaceFolder[]): string[] => {
  const oldConfigFolders = getFoldersConfig()
  const isWin = isWindows()
  const homeDir = os.homedir()

  if (wsFolders.length > 0) {
    const folders = wsFolders.map(({ uri }) => processPath(uri.fsPath, isWin, homeDir))
    const configFolders = oldConfigFolders.map((folder) => processPath(folder, isWin, homeDir))
    const newFolders: string[] = []

    // Find folders that are not in the config, or that do not start with a config folder
    for (let index = 0; index < folders.length; index++) {
      const folder = folders[index]
      const isInConfig =
        configFolders.includes(folder) ||
        configFolders.some((configFolder) => folder.startsWith(configFolder))

      if (!isInConfig) {
        newFolders.push(folder)
      }
    }

    const replacedFolders: string[] = []

    // Check if any config folder is deeper than the the new folders and replace those with the new ones
    let updatedConfigFolders = configFolders.map((configFolder) => {
      const configReplacemnet = newFolders.find((newFolder) => configFolder.startsWith(newFolder))

      if (configReplacemnet) {
        replacedFolders.push(configReplacemnet)

        return configReplacemnet
      }

      return configFolder
    })

    // Check if any config folder is at the same level and replace with a common parent
    updatedConfigFolders = updatedConfigFolders.map((configFolder) => {
      return configFolder
    })

    const result = [
      ...new Set([
        ...newFolders.filter((folder) => !replacedFolders.includes(folder)),
        ...updatedConfigFolders,
      ]),
    ]

    getConfigFolderStructure(newFolders, configFolders)

    // Now check for folders at equal depth and replace them with their common parent

    /*     const folderCounts: FolderCounts = {}

    for (let index = 0; index < newFolders.length; index++) {
      let subpath: string | undefined = newFolders[index]
      let count = 0

      while (subpath !== undefined) {
        if (count > MAX_COUNT) {
          break
        }

        count += 1
        const lastIndex = subpath.lastIndexOf(path.sep)

        if (lastIndex === -1) {
          subpath = undefined
          break
        }

        subpath = subpath.substring(0, lastIndex)

        if (folderCounts[subpath] === undefined) {
          folderCounts[subpath] = 1
        } else {
          folderCounts[subpath] += 1
        }
      }
    } */

    /* result.forEach((folder) => {
      console.log('### folder', folder)
      let subpath: string | undefined = folder
      const maxLoop = 50
      let count = 0

      while (subpath !== undefined) {
        if (count > maxLoop) {
          break
        }

        count += 1
        console.log('### count', count)
        const lastIndex = subpath.lastIndexOf(path.sep)

        if (lastIndex === -1) {
          subpath = undefined
          break
        }

        subpath = subpath.substring(0, lastIndex)

        if (folderCounts[subpath] === undefined) {
          folderCounts[subpath] = 1
        } else {
          folderCounts[subpath] += 1
        }
      }
    }) */

    console.log('### folders', folders)
    console.log('### configFolders', configFolders)
    console.log('### newFolders', newFolders)
    console.log('### updatedConfigFolders', updatedConfigFolders)
    console.log('### result', result)
    console.log('### ======')

    return result
  }

  return oldConfigFolders
}
