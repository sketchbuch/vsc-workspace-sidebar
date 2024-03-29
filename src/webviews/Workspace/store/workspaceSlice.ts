import { createSlice } from '@reduxjs/toolkit'
import * as vscode from 'vscode'
import { SearchState, WorkspaceState } from '../WorkspaceViewProvider.interface'
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

export const initialState: WorkspaceState = {
  error: '',
  errorObj: null,
  fileCount: 0,
  result: 'ok',
  rootFolders: [],
  search: { ...initialSearchState },
  selected: !!vscode.workspace.workspaceFile ? vscode.workspace.workspaceFile.fsPath : '',
  view: 'loading',
  visibleFileCount: 0,
  workspaceData: [],
  wsType: getWsType(vscode.workspace.workspaceFile, vscode.workspace.workspaceFolders),
}

export const workspaceSlice = createSlice({
  initialState: { ...initialState },
  extraReducers: (builder) => {
    builder.addCase(fetch.pending, fetchPending)
    builder.addCase(fetch.rejected, fetchRejected)
    builder.addCase(fetch.fulfilled, fetchFulfilled)
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
