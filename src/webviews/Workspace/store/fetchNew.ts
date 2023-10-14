import { createAsyncThunk } from '@reduxjs/toolkit'
import { getShowTreeConfig } from '../../../config/treeview'
import {
  FindAllRootFolderFiles,
  findAllRootFolderFiles,
} from '../../../utils/fs/findAllRootFolderFiles'
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment'
import { WorkspaceState, WorkspaceThunkAction } from '../WorkspaceViewProvider.interface'
import { convertWsFilesNew } from '../helpers/convertWsFilesNew'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTreeNew } from '../helpers/getFileTreeNew'
import { getVisibleFiles } from '../helpers/getVisibleFiles'

export const fetchNew = createAsyncThunk('fetchNew', findAllRootFolderFiles)

export const fetchNewFulfilled = (
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
    state.rootFolders = action.payload.rootFolders.map(({ baseFolder, files }) => {
      const convertedFiles = convertWsFilesNew(baseFolder, files, state.selected)
      const visibleFiles = getVisibleFiles(convertedFiles, state.search, state.sort)
      const fileTree = showTree ? getFileTreeNew(baseFolder, visibleFiles) : null

      console.log('### fileTree', fileTree)

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

export const fetchNewPending = (state: WorkspaceState) => {
  state.state = 'loading'
  state.invalidReason = 'ok'
  state.isFolderInvalid = false
}

export const fetchNewRejected = (state: WorkspaceState) => {
  state.error = 'FETCH'
  state.state = 'error'
}
