import { getFoldersConfig } from '../../config/folders'
import { AllRootFoldersResult } from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { FindRootFolderFilesNew, findRootFolderFilesNew } from './findRootFolderFilesNew'

interface FindAllRootFolderFiles {
  rootFolders: FindRootFolderFilesNew[]
  result: AllRootFoldersResult
}

export const findAllRootFolderFiles = async (): Promise<FindAllRootFolderFiles> => {
  const folders = getFoldersConfig()

  if (folders.length > 0) {
    const rootFolders: FindRootFolderFilesNew[] = []

    folders.forEach(async (folder) => {
      const files = await findRootFolderFilesNew(folder)
      rootFolders.push(files)
    })

    return Promise.resolve({ rootFolders, result: 'folders' })
  }

  return Promise.resolve({ rootFolders: [], result: 'no-folders' })
}
