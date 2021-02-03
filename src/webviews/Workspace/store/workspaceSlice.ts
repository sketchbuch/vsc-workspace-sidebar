import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as vscode from 'vscode';
import { WorkspaceState } from '../..';
import { getWorkspaceFiles } from '../helpers';
import { error } from './error';
import { invalid } from './invalid';
import { list } from './list';
import { loading } from './loading';

export const fetch = createAsyncThunk('getFiles', async (thunkAPI) => {
  return await getWorkspaceFiles();
});

export const workspaceSlice = createSlice({
  name: 'ws',
  initialState: {
    error: '',
    files: false,
    isFolderInvalid: false,
    selected: !!vscode.workspace.workspaceFile ? vscode.workspace.workspaceFile.fsPath : '',
    state: 'loading',
  } as WorkspaceState,
  reducers: {
    error,
    invalid,
    list,
    loading,
  },
  extraReducers: (builder) => {
    builder.addCase(fetch.pending, (state) => {
      state.state = 'loading';
    });
    builder.addCase(fetch.rejected, (state) => {
      state.error = 'FETCH';
      state.state = 'error';
    });
    builder.addCase(fetch.fulfilled, (state, action) => {
      state.files = action.payload;
      state.state = 'list';
    });
  },
});
