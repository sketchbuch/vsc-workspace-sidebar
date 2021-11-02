import { createAsyncThunk } from '@reduxjs/toolkit';
import { WorkspaceFiles, WorkspaceState, WorkspaceThunkAction } from '../..';
import { findWorkspaceFiles } from '../../../utils';
import { convertWsFiles } from '../helpers/convertWsFiles';
import { getVisibleFiles } from '../helpers/getVisibleFiles';

export const fetch = createAsyncThunk('fetch', findWorkspaceFiles);

export const fetchFulfilled = (
  state: WorkspaceState,
  action: WorkspaceThunkAction<WorkspaceFiles>
) => {
  state.files = action.payload;
  state.convertedFiles = action.payload ? convertWsFiles(action.payload, state.selected) : [];

  if (state.files === false) {
    state.isFolderInvalid = true;
    state.state = 'invalid';
    state.visibleFiles = [];
  } else {
    state.isFolderInvalid = false;
    state.state = 'list';
    state.visibleFiles = getVisibleFiles(state.convertedFiles, state.search, state.sort);
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
