import * as os from 'os'
import * as path from 'path'
import * as vscode from 'vscode'
import { getFoldersConfig } from '../../../config/folders'
import { isWindows } from '../../../utils/os/isWindows'

type FolderCounts = Record<string, number>

const MAX_COUNT = 50

export const getNewRootFolderConfig = (wsFolders: vscode.WorkspaceFolder[]): string[] => {
  const oldConfigFolders = getFoldersConfig()
  const isWin = isWindows()
  const homeDir = os.homedir()

  const processPath = (path: string): string => {
    if (isWin) {
      return path.replace(/^([A-Z]):/, (match) => match.toLowerCase())
    }

    return path.replace(homeDir, `~`).replace('/~', `~`)
  }

  if (wsFolders.length > 0) {
    const folders = wsFolders.map(({ uri }) => processPath(uri.fsPath))
    const configFolders = oldConfigFolders.map((folder) => processPath(folder))
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
    const updatedConfigFolders = configFolders.map((configFolder) => {
      const configReplacemnet = newFolders.find((newFolder) => configFolder.startsWith(newFolder))

      if (configReplacemnet) {
        replacedFolders.push(configReplacemnet)

        return configReplacemnet
      }

      return configFolder
    })

    const result = [
      ...new Set([
        ...newFolders.filter((folder) => !replacedFolders.includes(folder)),
        ...updatedConfigFolders,
      ]),
    ]

    // Now check for folders at equal depth and replace them with their common parent
    const folderCounts: FolderCounts = {}

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
    }

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
    console.log('### folderCounts', folderCounts)

    return result
  }

  return oldConfigFolders
}
