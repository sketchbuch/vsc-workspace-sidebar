import { PayloadAction } from '@reduxjs/toolkit'
import { getShowTreeConfig } from '../../../config/treeview'
import { WorkspacePmPayloadSearch, WorkspaceState } from '../WorkspaceViewProvider.interface'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getFileTreeNew } from '../helpers/getFileTreeNew'
import { getVisibleFiles } from '../helpers/getVisibleFiles'

export const setSearch = (
  state: WorkspaceState,
  action: PayloadAction<WorkspacePmPayloadSearch>
): void => {
  state.search = { ...state.search, ...action.payload }

  if (state.files.length === 0) {
    state.fileTree = null
    state.rootFolders = []
    state.treeFolders = []
    state.visibleFiles = []
  } else {
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
