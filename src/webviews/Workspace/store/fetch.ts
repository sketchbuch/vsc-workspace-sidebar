import { createAsyncThunk } from '@reduxjs/toolkit'
import * as os from 'os'
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
    state.fileCount = 0
    state.invalidReason = action.payload.result
    state.isFolderInvalid = true
    state.rootFolders = []
    state.view = 'invalid'
    state.visibleFileCount = 0
  } else {
    const homeDir = os.homedir()
    const showTree = getShowTreeConfig()
    let fileCount = 0
    let visibleFileCount = 0

    state.invalidReason = 'ok'
    state.isFolderInvalid = false
    state.view = 'list'

    state.rootFolders = action.payload.rootFolders.map(({ files, folderPath }) => {
      const convertedFiles = convertWsFiles(folderPath, files, state.selected)
      const visibleFiles = getVisibleFiles(convertedFiles, state.search, state.sort)
      const fileTree = showTree ? getFileTree(folderPath, visibleFiles) : null
      const treeFolders = showTree && fileTree !== null ? getAllFoldersFromTree(fileTree) : []

      fileCount += files.length
      visibleFileCount += visibleFiles.length

      return {
        closedFolders: [],
        convertedFiles,
        files,
        fileTree,
        folderName: getLastPathSegment(folderPath),
        folderPath,
        folderPathShort: folderPath.replace(homeDir, `~`),
        treeFolders,
        visibleFiles,
      }
    })

    state.fileCount = fileCount
    state.visibleFileCount = visibleFileCount
  }
}

export const fetchPending = (state: WorkspaceState) => {
  state.view = 'loading'
  state.invalidReason = 'ok'
  state.isFolderInvalid = false
}

export const fetchRejected = (state: WorkspaceState) => {
  state.error = 'FETCH'
  state.view = 'error'
}
