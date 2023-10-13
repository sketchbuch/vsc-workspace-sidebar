import { getShowTreeConfig } from '../../../config/treeview'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getFileTreeNew } from '../helpers/getFileTreeNew'
import { getVisibleFiles } from '../helpers/getVisibleFiles'
import { WorkspaceState } from '../WorkspaceViewProvider.interface'

export const setVisibleFiles = (state: WorkspaceState): void => {
  if (state.files.length > 0) {
    const showTree = getShowTreeConfig()

    state.visibleFiles = getVisibleFiles(state.convertedFiles, state.search, state.sort)
    state.fileTree = showTree ? getFileTree(state.visibleFiles) : null
    state.treeFolders =
      showTree && state.fileTree !== null ? getAllFoldersFromTree(state.fileTree) : []

    state.rootFolders = state.rootFolders.map((rootFolder) => {
      const visibleFiles = getVisibleFiles(rootFolder.convertedFiles, state.search, state.sort)
      const fileTree = showTree ? getFileTreeNew(rootFolder.baseFolder, visibleFiles) : null
      const treeFolders = showTree && fileTree !== null ? getAllFoldersFromTree(fileTree) : []

      return {
        ...rootFolder,
        fileTree,
        treeFolders,
        visibleFiles,
      }
    })
  }
}
