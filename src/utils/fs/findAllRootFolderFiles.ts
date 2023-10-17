import { getFoldersConfig } from '../../config/folders'
import { AllRootFoldersResult } from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { FindRootFolderFiles } from './findRootFolderFiles'

export interface FindAllRootFolderFiles {
  rootFolders: FindRootFolderFiles[]
  result: AllRootFoldersResult
}

export const findAllRootFolderFiles = async (): Promise<FindAllRootFolderFiles> => {
  console.log('### findAllRootFolderFiles()')
  throw new Error('findAllRootFolderFiles error')
  const folders = getFoldersConfig()

  if (folders.length > 0) {
    return Promise.resolve({ rootFolders: [], result: 'no-workspaces' })
    /*     const rootFolders: FindRootFolderFiles[] = []

    for (let index = 0; index < folders.length; index++) {
      const folder = folders[index].trim()

      if (folder) {
        const files = await findRootFolderFiles(folder)
        rootFolders.push(files)
      }
    }

    const success = rootFolders.every((rootFolder) => rootFolder.result === 'ok')

    return Promise.resolve({ rootFolders, result: success ? 'success' : 'partial-success' }) */
  }

  return Promise.resolve({ rootFolders: [], result: 'no-root-folders' })
}
