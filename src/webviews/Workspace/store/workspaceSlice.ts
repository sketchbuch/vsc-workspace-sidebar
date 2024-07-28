import { createSlice } from '@reduxjs/toolkit'
import * as os from 'os'
import * as vscode from 'vscode'
import { getFoldersConfig } from '../../../config/folders'
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment'
import {
  ConfigRootFolder,
  SearchState,
  WorkspaceState,
  WorkspaceStateRootFolder,
} from '../WorkspaceViewProvider.interface'
import { getWsType } from '../helpers/getWsType'
import { error } from './error'
import { fetch, fetchFulfilled, fetchPending, fetchRejected } from './fetch'
import { invalid } from './invalid'
import { list } from './list'
import { loading } from './loading'
import { setFileTree } from './setFileTree'
import { setSearch } from './setSearch'
import { setVisibleFiles } from './setVisibleFiles'
import { toggleFolderState } from './toggleFolderState'
import { toggleFolderStateBulk } from './toggleFolderStateBulk'

export const initialSearchState: SearchState = {
  caseInsensitive: false,
  matchStart: false,
  term: '',
}

export const getItitialRootFolders = (
  configFolders: ConfigRootFolder[]
): WorkspaceStateRootFolder[] => {
  if (configFolders.length > 0) {
    return configFolders.map<WorkspaceStateRootFolder>(({ depth, path }) => {
      const homeDir = os.homedir()
      const folderName = getLastPathSegment(path) || path

      return {
        allFolders: [],
        closedFolders: [],
        convertedFiles: [],
        depth,
        files: [],
        fileTree: null,
        folderName: folderName,
        folderPath: path.replace(`~`, homeDir),
        folderPathShort: path.replace(homeDir, `~`),
        result: 'loading',
        visibleFiles: [],
      }
    })
  }

  return []
}

export const initialState: WorkspaceState = {
  error: '',
  errorObj: null,
  result: 'ok',
  rootFolders: getItitialRootFolders(getFoldersConfig()),
  search: { ...initialSearchState },
  selected: !!vscode.workspace.workspaceFile ? vscode.workspace.workspaceFile.fsPath : '',
  view: 'loading',
  wsType: getWsType(vscode.workspace.workspaceFile, vscode.workspace.workspaceFolders),
}

export const workspaceSlice = createSlice({
  initialState: { ...initialState },
  extraReducers: (builder) => {
    builder.addCase(fetch.fulfilled, fetchFulfilled)
    builder.addCase(fetch.pending, fetchPending)
    builder.addCase(fetch.rejected, fetchRejected)
  },
  name: 'ws',
  reducers: {
    error,
    invalid,
    list,
    loading,
    setFileTree,
    setSearch,
    setVisibleFiles,
    toggleFolderState,
    toggleFolderStateBulk,
  },
})
