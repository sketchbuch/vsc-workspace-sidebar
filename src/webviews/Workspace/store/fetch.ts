import { createAsyncThunk } from '@reduxjs/toolkit'
import * as os from 'os'
import { getShowTreeConfig } from '../../../config/treeview'
import {
  FindAllRootFolderFiles,
  findAllRootFolderFiles,
} from '../../../utils/fs/findAllRootFolderFiles'
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment'
import {
  ActionMetaFulfilled,
  ActionMetaRejected,
  FindRootFolderFiles,
  WorkspaceState,
  WorkspaceThunkAction,
  WorkspaceThunkErrorAction,
} from '../WorkspaceViewProvider.interface'
import { convertWsFiles } from '../helpers/convertWsFiles'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getVisibleFiles } from '../helpers/getVisibleFiles'

export const fetch = createAsyncThunk('fetch', findAllRootFolderFiles)

export const fetchFulfilled = (
  state: WorkspaceState,
  action: WorkspaceThunkAction<FindAllRootFolderFiles, ActionMetaFulfilled>
) => {
  console.log('### fetchFulfilled')
  if (action.payload.result !== 'ok') {
    state.fileCount = 0
    state.result = action.payload.result
    state.rootFolders = []
    state.view = 'invalid'
    state.visibleFileCount = 0
    state.workspaceData = action.payload.rootFolders
  } else {
    const homeDir = os.homedir()
    const showTree = getShowTreeConfig()

    const workspaceData: FindRootFolderFiles[] = []
    let fileCount = 0
    let visibleFileCount = 0

    state.result = 'ok'
    state.view = 'list'
    state.workspaceData = []

    state.rootFolders = action.payload.rootFolders.map(({ depth, files, folderPath, result }) => {
      const folderName = getLastPathSegment(folderPath) || folderPath
      const convertedFiles = convertWsFiles(folderPath, files, state.selected)
      const visibleFiles = getVisibleFiles(convertedFiles, state.search)
      const fileTree = showTree ? getFileTree(folderPath, visibleFiles) : null
      const allFolders =
        showTree && fileTree !== null ? getAllFoldersFromTree(fileTree) : [folderName]

      fileCount += files.length
      visibleFileCount += visibleFiles.length

      workspaceData.push({
        depth,
        files,
        folderPath,
        result,
      })

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
    })

    state.fileCount = fileCount
    state.visibleFileCount = visibleFileCount
    state.workspaceData = workspaceData
  }
}

export const fetchPending = (state: WorkspaceState) => {
  console.log('### fetchPending')

  state.view = 'loading'
  state.result = 'ok'
  state.workspaceData = []
}

export const fetchRejected = (
  state: WorkspaceState,
  action: WorkspaceThunkErrorAction<unknown, ActionMetaRejected>
) => {
  console.log('### fetchRejected')
  state.error = 'FETCH'
  state.errorObj = action.error ?? null
  state.view = 'error'
}
