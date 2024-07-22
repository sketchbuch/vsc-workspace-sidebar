import * as os from 'os'
import { getExcludedFoldersConfig } from '../../config/folders'
import {
  ConfigRootFolder,
  FindRootFolderFiles,
} from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { findRootFolderFiles } from './findRootFolderFiles'

export interface FetchRootFolderFiles {
  rootFolder: FindRootFolderFiles
}

export const fetchRootFolderFiles = async (
  configFolder: ConfigRootFolder
): Promise<FetchRootFolderFiles> => {
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
