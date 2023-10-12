import { getFoldersConfig } from '../../config/folders'
import { AllRootFoldersResult } from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { FindRootFolderFilesNew, findRootFolderFilesNew } from './findRootFolderFilesNew'

export interface FindAllRootFolderFiles {
  rootFolders: FindRootFolderFilesNew[]
  result: AllRootFoldersResult
}

export const findAllRootFolderFiles = async (): Promise<FindAllRootFolderFiles> => {
  const folders = getFoldersConfig()

  if (folders.length > 0) {
    const rootFolders: FindRootFolderFilesNew[] = []

    for (let index = 0; index < folders.length; index++) {
      const files = await findRootFolderFilesNew(folders[index])
      rootFolders.push(files)
    }

    const success = rootFolders.every((rootFolder) => rootFolder.result === 'ok')

    return Promise.resolve({ rootFolders, result: success ? 'success' : 'partial-success' })
  }

  return Promise.resolve({ rootFolders: [], result: 'no-root-folders' })
}
