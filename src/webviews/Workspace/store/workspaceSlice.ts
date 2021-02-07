import { createSlice } from '@reduxjs/toolkit';
import * as vscode from 'vscode';
import { WorkspaceState } from '../..';
import { error } from './error';
import { fetch, fetchFulfilled, fetchPending, fetchRejected } from './fetch';
import { invalid } from './invalid';
import { list } from './list';
import { loading } from './loading';
import { setPersistedState } from './setPersistedState';

export const workspaceSlice = createSlice({
  initialState: {
    error: '',
    files: false,
    isFolderInvalid: false,
    selected: !!vscode.workspace.workspaceFile ? vscode.workspace.workspaceFile.fsPath : '',
    state: 'loading',
    sort: 'ascending',
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
    setPersistedState,
  },
});
