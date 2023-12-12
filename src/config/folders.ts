import { workspace } from 'vscode'
import {
  CONFIG_EXCLUDED_FOLDERS,
  CONFIG_EXCLUDE_HIDDEN_FODLERS,
  CONFIG_FOLDER,
  CONFIG_FOLDERS,
} from '../constants/config'

export const getFoldersConfig = (): string[] => {
  const oldFolder =
    workspace.getConfiguration().get<string>('workspaceSidebar.folder') || CONFIG_FOLDER
  const rootFolders =
    workspace.getConfiguration().get<string[]>('workspaceSidebar.rootFolders') ?? CONFIG_FOLDERS
  let folders: string[] = []

  if (rootFolders.length === 0 && oldFolder) {
    folders.push(oldFolder)
  } else if (rootFolders.length > 0) {
    folders = [...new Set(rootFolders)] // Remove duplicates
  }

  folders = folders.map((folder) => {
    let newFolder = folder

    if (folder.startsWith('/~')) {
      newFolder = newFolder.slice(1)
    }

    if (folder.endsWith('/')) {
      newFolder = newFolder.slice(0, -1)
    }

    return newFolder
  })

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

export const getExcludeHiddenFoldersConfig = (): boolean => {
  return (
    workspace.getConfiguration().get('workspaceSidebar.excludeHiddenFolders') ??
    CONFIG_EXCLUDE_HIDDEN_FODLERS
  )
}
