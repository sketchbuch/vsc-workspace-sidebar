import { createSlice } from '@reduxjs/toolkit'
import * as vscode from 'vscode'
import { SearchState, WorkspaceState } from '../WorkspaceViewProvider.interface'
import { getWsType } from '../helpers/getWsType'
import { error } from './error'
import { fetchNew, fetchNewFulfilled, fetchNewPending, fetchNewRejected } from './fetchNew'
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
  invalidReason: 'ok',
  isFolderInvalid: false,
  rootFolders: [],
  search: { ...initialSearchState },
  selected: !!vscode.workspace.workspaceFile ? vscode.workspace.workspaceFile.fsPath : '',
  sort: 'ascending',
  state: 'loading',
  wsType: getWsType(vscode.workspace.workspaceFile, vscode.workspace.workspaceFolders),
}

export const workspaceSlice = createSlice({
  initialState: { ...initialState },
  extraReducers: (builder) => {
    builder.addCase(fetchNew.pending, fetchNewPending)
    builder.addCase(fetchNew.rejected, fetchNewRejected)
    builder.addCase(fetchNew.fulfilled, fetchNewFulfilled)
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
