import { createAsyncThunk } from '@reduxjs/toolkit'
import { getShowTreeConfig } from '../../../config/treeview'
import {
  FindAllRootFolderFiles,
  findAllRootFolderFiles,
} from '../../../utils/fs/findAllRootFolderFiles'
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment'
import { WorkspaceState, WorkspaceThunkAction } from '../WorkspaceViewProvider.interface'
import { convertWsFiles } from '../helpers/convertWsFiles'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getVisibleFiles } from '../helpers/getVisibleFiles'

export const fetch = createAsyncThunk('fetch', findAllRootFolderFiles)

export const fetchFulfilled = (
  state: WorkspaceState,
  action: WorkspaceThunkAction<FindAllRootFolderFiles>
) => {
  if (action.payload.result === 'no-root-folders') {
    state.invalidReason = action.payload.result
    state.isFolderInvalid = true
    state.rootFolders = []
    state.state = 'invalid'
  } else {
    const showTree = getShowTreeConfig()

    state.invalidReason = 'ok'
    state.isFolderInvalid = false
    state.state = 'list'

    state.rootFolders = action.payload.rootFolders.map(({ baseFolder, files }) => {
      const convertedFiles = convertWsFiles(baseFolder, files, state.selected)
      const visibleFiles = getVisibleFiles(convertedFiles, state.search, state.sort)
      const fileTree = showTree ? getFileTree(baseFolder, visibleFiles) : null
      const treeFolders = showTree && fileTree !== null ? getAllFoldersFromTree(fileTree) : []

      return {
        baseFolder,
        baseFolderLabel: getLastPathSegment(baseFolder),
        closedFolders: [],
        convertedFiles,
        files,
        fileTree,
        treeFolders,
        visibleFiles,
      }
    })
  }
}

export const fetchPending = (state: WorkspaceState) => {
  state.state = 'loading'
  state.invalidReason = 'ok'
  state.isFolderInvalid = false
}

export const fetchRejected = (state: WorkspaceState) => {
  state.error = 'FETCH'
  state.state = 'error'
}
