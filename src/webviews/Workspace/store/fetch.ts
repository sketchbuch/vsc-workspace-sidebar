import { createAsyncThunk } from '@reduxjs/toolkit';
import { WorkspaceFiles, WorkspaceState, WorkspaceThunkAction } from '../..';
import { findWorkspaceFiles } from '../../../utils';

export const fetch = createAsyncThunk('fetch', findWorkspaceFiles);

export const fetchPending = (state: WorkspaceState) => {
  state.state = 'loading';
  state.isFolderInvalid = false;
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
