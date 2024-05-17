import { PayloadAction } from '@reduxjs/toolkit'
import { getShowTreeConfig } from '../../../config/treeview'
import { PayloadSearch, WorkspaceState } from '../WorkspaceViewProvider.interface'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getVisibleFiles } from '../helpers/getVisibleFiles'

export const setSearch = (state: WorkspaceState, action: PayloadAction<PayloadSearch>): void => {
  console.log('### setSearch')
  const showTree = getShowTreeConfig()
  let visibleFileCount = 0

  state.search = { ...state.search, ...action.payload }

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
