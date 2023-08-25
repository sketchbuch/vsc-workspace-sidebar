import { PayloadAction } from '@reduxjs/toolkit'
import { getShowTreeConfig } from '../../../config/getConfig'
import { WorkspaceFiles, WorkspaceState } from '../WorkspaceViewProvider.interface'
import { convertWsFiles } from '../helpers/convertWsFiles'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getVisibleFiles } from '../helpers/getVisibleFiles'

export const list = (state: WorkspaceState, action: PayloadAction<WorkspaceFiles>): void => {
  state.files = action.payload
  state.convertedFiles = action.payload ? convertWsFiles(action.payload, state.selected) : []

  if (state.files.length === 0) {
    state.fileTree = null
    state.invalidReason = 'no-workspaces'
    state.isFolderInvalid = true
    state.state = 'invalid'
    state.treeFolders = []
    state.visibleFiles = []
  } else {
    const showTree = getShowTreeConfig()

    state.invalidReason = 'none'
    state.isFolderInvalid = false
    state.state = 'list'
    state.visibleFiles = getVisibleFiles(state.convertedFiles, state.search, state.sort)
    state.fileTree = showTree ? getFileTree(state.visibleFiles) : null
    state.treeFolders =
      showTree && state.fileTree !== null ? getAllFoldersFromTree(state.fileTree) : []
  }
}
