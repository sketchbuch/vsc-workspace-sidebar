import * as os from 'os'
import * as vscode from 'vscode'
import { getFoldersConfig } from '../../../config/folders'
import { isWindows } from '../../../utils/os/isWindows'

export const getNewRootFolderConfig = (wsFolders: vscode.WorkspaceFolder[]): string[] => {
  const oldConfigFolders = getFoldersConfig()

  if (wsFolders.length > 0) {
    const homeDir = os.homedir()
    const folders = wsFolders.map(({ uri }) => {
      if (isWindows()) {
        return uri.fsPath.replace(/^([A-Z]):/, (match) => match.toLowerCase())
      }

      return uri.fsPath.replace(homeDir, `~`).replace('/~', `~`)
    })
    const configFolders = oldConfigFolders.map((folder) => {
      if (isWindows()) {
        return folder.replace(/^([A-Z]):/, (match) => match.toLowerCase())
      }

      return folder.replace(homeDir, `~`)
    })
    const newFolders: string[] = []

    // Find folders that are not in the config, or that do not start with a config folder
    folders.forEach((folder) => {
      const isInConfig =
        configFolders.includes(folder) ||
        configFolders.some((configFolder) => folder.startsWith(configFolder))

      if (!isInConfig) {
        newFolders.push(folder)
      }
    })

    const replacedFolders: string[] = []

    // Now check if any config folder is deeper than the the new folders and replace those with the new ones
    const updatedConfigFolders = configFolders.map((configFolder) => {
      const configReplacemnet = newFolders.find((newFolder) => configFolder.startsWith(newFolder))

      if (configReplacemnet) {
        replacedFolders.push(configReplacemnet)

        return configReplacemnet
      }

      return configFolder
    })

    //configFolders.forEach((folder) => console.log('### folder', path.parse(folder)))

    return [
      ...new Set([
        ...newFolders.filter((folder) => !replacedFolders.includes(folder)),
        ...updatedConfigFolders,
      ]),
    ]
  }

  return oldConfigFolders
}
