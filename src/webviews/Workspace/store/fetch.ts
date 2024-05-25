import { createAsyncThunk } from '@reduxjs/toolkit'
import * as os from 'os'
import { getShowTreeConfig } from '../../../config/treeview'
import {
  FindAllRootFolderFiles,
  findAllRootFolderFiles,
} from '../../../utils/fs/findAllRootFolderFiles'
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment'
import { ConfigRootFolder, WorkspaceState } from '../WorkspaceViewProvider.interface'
import { convertWsFiles } from '../helpers/convertWsFiles'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getVisibleFiles } from '../helpers/getVisibleFiles'
import { FetchFulfilledAction, FetchPendingAction, FetchRejectedAction } from './store.interface'

export const fetch = createAsyncThunk('fetch', findAllRootFolderFiles)

export const fetchFulfilled = (
  state: WorkspaceState,
  action: FetchFulfilledAction<ConfigRootFolder, FindAllRootFolderFiles>
) => {
  if (action.payload.rootFolder.result !== 'ok') {
    state.fileCount = 0
    state.result = action.payload.rootFolder.result
    state.rootFolders = []
    state.view = 'invalid'
    state.visibleFileCount = 0
    state.workspaceData.set(action.payload.rootFolder.folderPath, action.payload.rootFolder)
  } else {
    const homeDir = os.homedir()
    const showTree = getShowTreeConfig()

    const { depth, files, folderPath, result } = action.payload.rootFolder

    state.rootFolders = state.rootFolders.map((rootFolder) => {
      if (rootFolder.folderPath === folderPath) {
        const folderName = getLastPathSegment(folderPath) || folderPath
        const convertedFiles = convertWsFiles(folderPath, files, state.selected)
        const visibleFiles = getVisibleFiles(convertedFiles, state.search)
        const fileTree = showTree ? getFileTree(folderPath, visibleFiles) : null
        const allFolders =
          showTree && fileTree !== null ? getAllFoldersFromTree(fileTree) : [folderName]

        return {
          allFolders,
          closedFolders: [],
          convertedFiles,
          depth,
          files,
          fileTree,
          folderName: folderName,
          folderPath,
          folderPathShort: folderPath.replace(homeDir, `~`),
          result,
          visibleFiles,
        }
      }

      return rootFolder
    })

    state.visibleFileCount = 0
    state.fileCount = 0

    state.rootFolders.forEach(({ files, visibleFiles }) => {
      state.visibleFileCount += visibleFiles.length
      state.fileCount += files.length
    })

    state.result = 'ok'
    state.view = 'list'
    state.workspaceData.set(action.payload.rootFolder.folderPath, action.payload.rootFolder)
  }
}

export const fetchPending = (
  state: WorkspaceState,
  action: FetchPendingAction<ConfigRootFolder>
) => {
  state.visibleFileCount = 0
  state.fileCount = 0

  state.rootFolders = state.rootFolders.map((rootFolder) => {
    if (rootFolder.folderPathShort === action.meta.arg.path) {
      rootFolder.result = 'loading'
    } else {
      state.visibleFileCount += rootFolder.visibleFiles.length
      state.fileCount += rootFolder.files.length
    }

    return rootFolder
  })

  state.view = 'list'
  state.result = 'ok'
  state.workspaceData.delete(action.meta.arg.path)
}

export const fetchRejected = (
  state: WorkspaceState,
  action: FetchRejectedAction<ConfigRootFolder>
) => {
  state.error = 'FETCH'
  state.errorObj = action.error ?? null
  state.view = 'error'
  state.workspaceData.delete(action.meta.arg.path)
}
