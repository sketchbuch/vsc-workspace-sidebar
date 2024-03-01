import * as os from 'os'
import {
  getExcludeHiddenFoldersConfig,
  getExcludedFoldersConfig,
  getFoldersConfig,
} from '../../config/folders'
import {
  FindFileResult,
  FindRootFolderFiles,
} from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { findRootFolderFiles } from './findRootFolderFiles'

export interface FindAllRootFolderFiles {
  rootFolders: FindRootFolderFiles[]
  result: FindFileResult
}

export const findAllRootFolderFiles = async (): Promise<FindAllRootFolderFiles> => {
  const configFolders = getFoldersConfig()

  if (configFolders.length > 0) {
    const excludedFoldersConfig = getExcludedFoldersConfig()
    const excludeHiddenFoldersConfig = getExcludeHiddenFoldersConfig()
    const homeDir = os.homedir()

    const fileCount: string[] = []
    const isHiddenExcludedCount: string[] = []
    const nonExistentCount: string[] = []
    const noWorkspaceCount: string[] = []
    const rootFolders: FindRootFolderFiles[] = []

    for (let index = 0; index < configFolders.length; index++) {
      const configFolder = configFolders[index]
      const { path, depth } = configFolder

      if (path) {
        const rootFolder = await findRootFolderFiles({
          excludedFolders: excludedFoldersConfig,
          excludeHiddenFolders: excludeHiddenFoldersConfig,
          folder: path,
          homeDir,
          maxDepth: depth,
        })

        if (rootFolder.result === 'is-hidden-excluded') {
          isHiddenExcludedCount.push(path)
        } else if (rootFolder.result === 'no-workspaces') {
          noWorkspaceCount.push(path)
        } else if (rootFolder.result === 'is-file') {
          fileCount.push(path)
        } else if (rootFolder.result === 'nonexistent') {
          nonExistentCount.push(path)
        }

        rootFolders.push(rootFolder)
      }
    }

    if (fileCount.length === configFolders.length) {
      return Promise.resolve({ rootFolders, result: 'is-file' })
    } else if (noWorkspaceCount.length === configFolders.length) {
      return Promise.resolve({ rootFolders, result: 'no-workspaces' })
    } else if (isHiddenExcludedCount.length === configFolders.length) {
      return Promise.resolve({ rootFolders, result: 'is-hidden-excluded' })
    } else if (nonExistentCount.length === configFolders.length) {
      return Promise.resolve({ rootFolders, result: 'nonexistent' })
    } // Else, Some root folders are empty or invalid - List view will handle these

    return Promise.resolve({ rootFolders, result: 'ok' })
  }

  return Promise.resolve({ rootFolders: [], result: 'no-root-folders' })
}
