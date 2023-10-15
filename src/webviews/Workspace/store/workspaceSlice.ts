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
import { setSort } from './setSort'
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
  fileCount: 0,
  invalidReason: 'ok',
  isFolderInvalid: false,
  rootFolders: [],
  search: { ...initialSearchState },
  selected: !!vscode.workspace.workspaceFile ? vscode.workspace.workspaceFile.fsPath : '',
  sort: 'ascending',
  view: 'loading',
  visibleFileCount: 0,
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
    setSort,
    setSearch,
    setVisibleFiles,
    toggleFolderState,
    toggleFolderStateBulk,
  },
})
