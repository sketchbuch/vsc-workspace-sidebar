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
    state.result = action.payload.rootFolder.result
    state.rootFolders = []
    state.view = 'invalid'
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
  }

  if (state.workspaceData.includes(action.payload.rootFolder)) {
    state.workspaceData = state.workspaceData.map((element) => {
      if (element.folderPath === action.payload.rootFolder.folderPath) {
        return action.payload.rootFolder
      }

      return element
    })
  } else {
    state.workspaceData.push(action.payload.rootFolder)
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
  state.workspaceData = state.workspaceData.filter(
    (element) => element.folderPath !== action.meta.arg.path
  )
}

export const fetchRejected = (
  state: WorkspaceState,
  action: FetchRejectedAction<ConfigRootFolder>
) => {
  state.error = 'FETCH'
  state.errorObj = action.error ?? null
  state.view = 'error'
  state.workspaceData = state.workspaceData.filter(
    (element) => element.folderPath !== action.meta.arg.path
  )
}
