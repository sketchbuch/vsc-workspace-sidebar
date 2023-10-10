import { PayloadAction } from '@reduxjs/toolkit'
import { getShowTreeConfig } from '../../../config/treeview'
import { WorkspacePmPayloadSearch, WorkspaceState } from '../WorkspaceViewProvider.interface'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getVisibleFiles } from '../helpers/getVisibleFiles'

export const setSearch = (
  state: WorkspaceState,
  action: PayloadAction<WorkspacePmPayloadSearch>
): void => {
  state.search = { ...state.search, ...action.payload }

  if (state.files.length === 0) {
    state.fileTree = null
    state.treeFolders = []
    state.visibleFiles = []
  } else {
    const showTree = getShowTreeConfig()

    state.visibleFiles = getVisibleFiles(state.convertedFiles, state.search, state.sort)
    state.fileTree = showTree ? getFileTree(state.visibleFiles) : null
    state.treeFolders =
      showTree && state.fileTree !== null ? getAllFoldersFromTree(state.fileTree) : []
  }
}
