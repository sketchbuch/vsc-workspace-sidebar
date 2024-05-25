import * as os from 'os'
import { getExcludedFoldersConfig } from '../../config/folders'
import {
  ConfigRootFolder,
  FindRootFolderFiles,
} from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { findRootFolderFiles } from './findRootFolderFiles'

export interface FindAllRootFolderFiles {
  rootFolder: FindRootFolderFiles
}

export const findAllRootFolderFiles = async (
  configFolder: ConfigRootFolder
): Promise<FindAllRootFolderFiles> => {
  console.log('### findAllRootFolderFiles', configFolder)
  const excludedFoldersConfig = getExcludedFoldersConfig()
  const homeDir = os.homedir()

  const { excludeHiddenFolders, depth, path } = configFolder

  const rootFolder = await findRootFolderFiles({
    excludedFolders: excludedFoldersConfig,
    excludeHiddenFolders,
    folder: path,
    homeDir,
    maxDepth: depth,
  })

  return Promise.resolve({ rootFolder })
}
