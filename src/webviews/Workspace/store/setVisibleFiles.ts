import { getShowTreeConfig } from '../../../config/treeview'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getVisibleFiles } from '../helpers/getVisibleFiles'
import { WorkspaceState } from '../WorkspaceViewProvider.interface'

export const setVisibleFiles = (state: WorkspaceState): void => {
  console.log('### setVisibleFiles')
  const showTree = getShowTreeConfig()
  let visibleFileCount = 0

  state.rootFolders = state.rootFolders.map((rootFolder) => {
    const visibleFiles = getVisibleFiles(rootFolder.convertedFiles, state.search)
    const fileTree = showTree ? getFileTree(rootFolder.folderPath, visibleFiles) : null
    const allFolders =
      showTree && fileTree !== null ? getAllFoldersFromTree(fileTree) : [rootFolder.folderName]

    visibleFileCount += visibleFiles.length

    return {
      ...rootFolder,
      allFolders,
      fileTree,
      visibleFiles,
    }
  })

  state.visibleFileCount = visibleFileCount
}
