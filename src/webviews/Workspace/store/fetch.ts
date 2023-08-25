import { createAsyncThunk } from '@reduxjs/toolkit'
import { getShowTreeConfig } from '../../../config/getConfig'
import { FindWorkspaceFiles, findWorkspaceFiles } from '../../../utils/fs/findWorkspaceFiles'
import { WorkspaceState, WorkspaceThunkAction } from '../WorkspaceViewProvider.interface'
import { convertWsFiles } from '../helpers/convertWsFiles'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getVisibleFiles } from '../helpers/getVisibleFiles'

export const fetch = createAsyncThunk('fetch', findWorkspaceFiles)

export const fetchFulfilled = (
  state: WorkspaceState,
  action: WorkspaceThunkAction<FindWorkspaceFiles>
) => {
  state.files = action.payload.files
  state.convertedFiles = action.payload ? convertWsFiles(action.payload.files, state.selected) : []

  if (state.files.length === 0) {
    state.fileTree = null
    state.invalidReason = action.payload.result
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

export const fetchPending = (state: WorkspaceState) => {
  state.state = 'loading'
  state.invalidReason = 'none'
  state.isFolderInvalid = false
}

export const fetchRejected = (state: WorkspaceState) => {
  state.error = 'FETCH'
  state.state = 'error'
}
