import { getShowTreeConfig } from '../../../config/treeview'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getVisibleFiles } from '../helpers/getVisibleFiles'
import { WorkspaceState } from '../WorkspaceViewProvider.interface'

export const setVisibleFiles = (state: WorkspaceState): void => {
  const showTree = getShowTreeConfig()

  state.rootFolders = state.rootFolders.map((rootFolder) => {
    const visibleFiles = getVisibleFiles(rootFolder.convertedFiles, state.search, state.sort)
    const fileTree = showTree ? getFileTree(rootFolder.baseFolder, visibleFiles) : null
    const treeFolders = showTree && fileTree !== null ? getAllFoldersFromTree(fileTree) : []

    return {
      ...rootFolder,
      fileTree,
      treeFolders,
      visibleFiles,
    }
  })
}
