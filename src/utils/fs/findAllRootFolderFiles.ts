import * as os from 'os'
import {
  getExcludeHiddenFoldersConfig,
  getExcludedFoldersConfig,
  getFoldersConfig,
} from '../../config/folders'
import { getDepthConfig } from '../../config/general'
import { FindFileResult } from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { FindRootFolderFiles, findRootFolderFiles } from './findRootFolderFiles'

export interface FindAllRootFolderFiles {
  rootFolders: FindRootFolderFiles[]
  result: FindFileResult
}

export const findAllRootFolderFiles = async (): Promise<FindAllRootFolderFiles> => {
  const folders = getFoldersConfig()

  if (folders.length > 0) {
    const depthConfig = getDepthConfig()
    const excludedFoldersConfig = getExcludedFoldersConfig()
    const excludeHiddenFoldersConfig = getExcludeHiddenFoldersConfig()
    const homeDir = os.homedir()

    const fileCount: string[] = []
    const nonExistentCount: string[] = []
    const noWorkspaceCount: string[] = []
    const rootFolders: FindRootFolderFiles[] = []

    for (let index = 0; index < folders.length; index++) {
      const folder = folders[index].trim()

      if (folder) {
        const rootFolder = await findRootFolderFiles({
          excludedFolders: excludedFoldersConfig,
          excludeHiddenFolders: excludeHiddenFoldersConfig,
          folder,
          homeDir,
          maxDepth: depthConfig,
        })

        if (rootFolder.result === 'no-workspaces') {
          noWorkspaceCount.push(folder)
        } else if (rootFolder.result === 'is-file') {
          fileCount.push(folder)
        } else if (rootFolder.result === 'nonexistent') {
          nonExistentCount.push(folder)
        }

        rootFolders.push(rootFolder)
      }
    }

    if (fileCount.length === folders.length) {
      return Promise.resolve({ rootFolders: [], result: 'is-file' })
    } else if (noWorkspaceCount.length === folders.length) {
      return Promise.resolve({ rootFolders: [], result: 'no-workspaces' })
    } else if (nonExistentCount.length === folders.length) {
      return Promise.resolve({ rootFolders: [], result: 'nonexistent' })
    } // Else, Some root folders are empty or invalid - List view will handle these

    return Promise.resolve({ rootFolders, result: 'ok' })
  }

  return Promise.resolve({ rootFolders: [], result: 'no-root-folders' })
}
