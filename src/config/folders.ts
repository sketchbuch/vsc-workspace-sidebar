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
  const excludeHiddenFolders = getExcludeHiddenFoldersConfig()
  const oldFolder =
    workspace.getConfiguration().get<string>('workspaceSidebar.folder') || CONFIG_FOLDER
  const rootFolders =
    workspace.getConfiguration().get<ConfigRootFolderSettings[]>('workspaceSidebar.rootFolders') ??
    CONFIG_FOLDERS
  let folders: ConfigRootFolder[] = []

  if (rootFolders.length === 0 && oldFolder) {
    folders.push({
      depth,
      excludeHiddenFolders,
      path: oldFolder,
    })
  } else if (rootFolders.length > 0) {
    const uniqueFolderPaths = new Set<string>()
    rootFolders.forEach((ele) => uniqueFolderPaths.add(ele.path))

    for (const path of uniqueFolderPaths) {
      const pathConfig = rootFolders.find((rootFolder) => rootFolder.path === path)

      if (pathConfig) {
        const eleDepth = pathConfig.depth
        const eleExcludeHidden = pathConfig.excludeHiddenFolders
        const hasDepth = eleDepth || eleDepth === 0
        const intEleDepth = hasDepth ? parseInt(eleDepth.toString()) : depth

        folders.push({
          excludeHiddenFolders:
            eleExcludeHidden === Boolean(eleExcludeHidden)
              ? eleExcludeHidden
              : excludeHiddenFolders,
          depth: Number.isNaN(intEleDepth) ? depth : getIntWithinBounds(intEleDepth),
          path: pathConfig.path.trim(),
        })
      }
    }
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
