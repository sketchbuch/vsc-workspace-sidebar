import { createAsyncThunk } from '@reduxjs/toolkit';
import { WorkspaceFiles, WorkspaceState, WorkspaceThunkAction } from '../..';
import { getWorkspaceFiles } from '../helpers';

export const fetch = createAsyncThunk('getFiles', async () => {
  return await getWorkspaceFiles();
});

export const fetchPending = (state: WorkspaceState) => {
  state.state = 'loading';
};

export const fetchRejected = (state: WorkspaceState) => {
  state.error = 'FETCH';
  state.state = 'error';
};

export const fetchFulfilled = (
  state: WorkspaceState,
  action: WorkspaceThunkAction<WorkspaceFiles>
) => {
  state.files = action.payload;
  state.state = 'list';
};
