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
  const showTree = getShowTreeConfig()

  state.search = { ...state.search, ...action.payload }

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
