import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { WorkspaceState } from '../WorkspaceViewProvider.interface'

export const setFileTree = (state: WorkspaceState): void => {
  state.rootFolders = state.rootFolders.map((rootFolder) => {
    const newFolder = { ...rootFolder }

    newFolder.fileTree = getFileTree(rootFolder.folderPath, rootFolder.visibleFiles)
    newFolder.allFolders =
      newFolder.fileTree !== null
        ? getAllFoldersFromTree(newFolder.fileTree)
        : [rootFolder.folderName]

    return newFolder
  })
}
