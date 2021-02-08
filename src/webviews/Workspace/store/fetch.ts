import { createAsyncThunk } from '@reduxjs/toolkit';
import { WorkspaceFiles, WorkspaceState, WorkspaceThunkAction } from '../..';
import { findWorkspaceFiles } from '../../../utils';
import { getVisibleFiles } from '../helpers/getVisibleFiles';

export const fetch = createAsyncThunk('fetch', findWorkspaceFiles);

export const fetchFulfilled = (
  state: WorkspaceState,
  action: WorkspaceThunkAction<WorkspaceFiles>
) => {
  state.files = action.payload;

  if (action.payload === false) {
    state.isFolderInvalid = true;
    state.state = 'invalid';
    state.visibleFiles = [];
  } else {
    state.isFolderInvalid = false;
    state.state = 'list';
    state.visibleFiles = getVisibleFiles(action.payload, state.selected, state.search, state.sort);
  }
};

export const fetchPending = (state: WorkspaceState) => {
  state.state = 'loading';
  state.isFolderInvalid = false;
};

export const fetchRejected = (state: WorkspaceState) => {
  state.error = 'FETCH';
  state.state = 'error';
};
