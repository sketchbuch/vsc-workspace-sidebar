import { createSlice } from '@reduxjs/toolkit';
import * as vscode from 'vscode';
import { WorkspaceState } from '../..';
import { getWsType } from '../helpers/getWsType';
import { error } from './error';
import { fetch, fetchFulfilled, fetchPending, fetchRejected } from './fetch';
import { invalid } from './invalid';
import { list } from './list';
import { loading } from './loading';
import { setClosedFolders } from './setClosedFolders';
import { setPersistedState } from './setPersistedState';
import { setSearchTerm } from './setSearchTerm';
import { setShowPaths } from './setShowPaths';

export const workspaceSlice = createSlice({
  initialState: {
    closedFolders: [],
    convertedFiles: [],
    error: '',
    files: false,
    isFolderInvalid: false,
    search: '',
    selected: !!vscode.workspace.workspaceFile ? vscode.workspace.workspaceFile.fsPath : '',
    sort: 'ascending',
    state: 'loading',
    visibleFiles: [],
    wsType: getWsType(vscode.workspace.workspaceFile, vscode.workspace.workspaceFolders),
  } as WorkspaceState,
  extraReducers: (builder) => {
    builder.addCase(fetch.pending, fetchPending);
    builder.addCase(fetch.rejected, fetchRejected);
    builder.addCase(fetch.fulfilled, fetchFulfilled);
  },
  name: 'ws',
  reducers: {
    error,
    invalid,
    list,
    loading,
    setClosedFolders,
    setPersistedState,
    setSearchTerm,
    setShowPaths,
  },
});
