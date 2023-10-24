import { workspace } from 'vscode'
import { CONFIG_EXCLUDED_FOLDERS, CONFIG_FOLDER, CONFIG_FOLDERS } from '../constants/config'

const getFolderConfig = (): string => {
  return workspace.getConfiguration().get('workspaceSidebar.folder') || CONFIG_FOLDER
}

export const getFoldersConfig = (): string[] => {
  const oldFolder = getFolderConfig()
  const rootFolders =
    workspace.getConfiguration().get<string[]>('workspaceSidebar.rootFolders') ?? CONFIG_FOLDERS
  let folders: string[] = []

  if (rootFolders.length === 0 && oldFolder) {
    folders.push(oldFolder)
  } else if (rootFolders.length > 1) {
    folders = [...new Set(rootFolders)] // Remove duplicates
  }

  return folders
}

export const getExcludedFoldersConfig = (): string[] => {
  const excludedFolders =
    workspace.getConfiguration().get<string[]>('workspaceSidebar.folders.excluded') ??
    CONFIG_EXCLUDED_FOLDERS
  let folders: string[] = []

  if (excludedFolders.length > 1) {
    folders = [...new Set(excludedFolders)] // Remove duplicates
  }

  return folders
}
