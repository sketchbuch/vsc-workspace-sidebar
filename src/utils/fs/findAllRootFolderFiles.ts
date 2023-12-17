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

    const rootFolders: FindRootFolderFiles[] = []
    const invalidFolders: string[] = []
    const noWorkspaces: string[] = []

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
          noWorkspaces.push(folder)
        } else if (rootFolder.result === 'invalid-folder') {
          invalidFolders.push(folder)
        }

        rootFolders.push(rootFolder)
      }
    }

    if (invalidFolders.length === folders.length) {
      return Promise.resolve({ rootFolders: [], result: 'invalid-folder' })
    } else if (noWorkspaces.length === folders.length) {
      return Promise.resolve({ rootFolders: [], result: 'no-workspaces' })
    } // Else, Some root folders are empty or invalid - List view will handle these

    return Promise.resolve({ rootFolders, result: 'ok' })
  }

  return Promise.resolve({ rootFolders: [], result: 'no-root-folders' })
}
