import { createAsyncThunk } from '@reduxjs/toolkit'
import * as os from 'os'
import { getFoldersConfig } from '../../../config/folders'
import { getShowTreeConfig } from '../../../config/treeview'
import { fetchRootFolderFiles, FetchRootFolderFiles } from '../../../utils/fs/fetchRootFolderFiles'
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment'
import {
  ConfigRootFolder,
  WorkspaceState,
  WorkspaceStateRootFolder,
} from '../WorkspaceViewProvider.interface'
import { convertWsFiles } from '../helpers/convertWsFiles'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getVisibleFiles } from '../helpers/getVisibleFiles'
import { getInitialRootFolders } from './initialStates'
import { FetchFulfilledAction, FetchPendingAction, FetchRejectedAction } from './store.interface'

export const fetch = createAsyncThunk('fetch', fetchRootFolderFiles)

const getNewRootFolders = (rootFolders: WorkspaceStateRootFolder[]): WorkspaceStateRootFolder[] => {
  const configFolders = getInitialRootFolders(getFoldersConfig())
  const newRootFolders: WorkspaceStateRootFolder[] = []

  configFolders.forEach((element) => {
    const match = rootFolders.find((f) => f.folderPath === element.folderPath)

    if (match) {
      newRootFolders.push(match)
    } else {
      newRootFolders.push({ ...element, result: 'map-error' })
    }
  })

  return newRootFolders
}

export const fetchFulfilled = (
  state: WorkspaceState,
  action: FetchFulfilledAction<ConfigRootFolder, FetchRootFolderFiles>
) => {
  const {
    payload: { configId, rootFolder },
  } = action

  const homeDir = os.homedir()
  const showTree = getShowTreeConfig()
  const newRootFolders = getNewRootFolders(state.rootFolders)
  const { depth, files, folderPath, result } = rootFolder

  state.rootFolders = newRootFolders.map((folder) => {
    if (folder.folderPath === folderPath) {
      const folderName = getLastPathSegment(folderPath) || folderPath
      const convertedFiles = convertWsFiles(folderPath, files, state.selected)
      const visibleFiles = getVisibleFiles(convertedFiles, state.search)
      const fileTree = showTree ? getFileTree(folderPath, visibleFiles) : null
      const allFolders =
        showTree && fileTree !== null ? getAllFoldersFromTree(fileTree) : [folderName]

      return {
        allFolders,
        closedFolders: [],
        configId,
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

    return folder
  })

  state.result = rootFolder.result
  state.view = 'list'
}

export const fetchPending = (
  state: WorkspaceState,
  action: FetchPendingAction<ConfigRootFolder>
) => {
  state.rootFolders = state.rootFolders.map((rootFolder) => {
    if (rootFolder.folderPathShort === action.meta.arg.path) {
      rootFolder.result = 'loading'
    }

    return rootFolder
  })

  state.view = 'list'
  state.result = 'ok'
}

export const fetchRejected = (
  state: WorkspaceState,
  action: FetchRejectedAction<ConfigRootFolder>
) => {
  state.error = 'FETCH'
  state.errorObj = action.error ?? null
  state.view = 'error'
}
