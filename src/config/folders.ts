import { workspace } from 'vscode'
import {
  CONFIG_EXCLUDED_FOLDERS,
  CONFIG_EXCLUDE_HIDDEN_FODLERS,
  CONFIG_FOLDER,
  CONFIG_FOLDERS,
} from '../constants/config'
import { getIntWithinBounds } from '../utils/numbers/getIntWithinBounds'
import {
  ConfigRootFolder,
  ConfigRootFolderSettings,
} from '../webviews/Workspace/WorkspaceViewProvider.interface'
import { getDepthConfig } from './general'

export const getFoldersConfig = (): ConfigRootFolder[] => {
  const depth = getDepthConfig()
  const oldFolder =
    workspace.getConfiguration().get<string>('workspaceSidebar.folder') || CONFIG_FOLDER
  const rootFolders =
    workspace.getConfiguration().get<ConfigRootFolderSettings[]>('workspaceSidebar.rootFolders') ??
    CONFIG_FOLDERS
  let folders: ConfigRootFolder[] = []

  if (rootFolders.length === 0 && oldFolder) {
    folders.push({
      path: oldFolder,
      depth,
    })
  } else if (rootFolders.length > 0) {
    const foldersUnique = new Set<ConfigRootFolder>([])

    rootFolders.forEach((ele) => {
      const eleDepth = ele.depth
      const hasDepth = eleDepth || eleDepth === 0
      const intEleDepth = hasDepth ? parseInt(eleDepth.toString()) : depth

      foldersUnique.add({
        depth: Number.isNaN(intEleDepth) ? depth : getIntWithinBounds(intEleDepth),
        path: ele.path.trim(),
      })
    })

    folders = [...foldersUnique] // Remove duplicates
  }

  folders = folders.map((folder) => {
    let newFolder: ConfigRootFolder = { ...folder }
    const { path } = newFolder

    if (path.startsWith('/~')) {
      newFolder.path = path.slice(1)
    }

    if (path.endsWith('/')) {
      newFolder.path = path.slice(0, -1)
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
