import { createAsyncThunk } from '@reduxjs/toolkit';
import { findWorkspaceFiles } from '../../../utils/fs/findWorkspaceFiles';
import { convertWsFiles } from '../helpers/convertWsFiles';
import { getFileTree } from '../helpers/getFileTree';
import { getVisibleFiles } from '../helpers/getVisibleFiles';
import {
  WorkspaceFiles,
  WorkspaceState,
  WorkspaceThunkAction,
} from '../WorkspaceViewProvider.interface';

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
    state.fileTree = {};
  } else {
    state.isFolderInvalid = false;
    state.state = 'list';
    state.visibleFiles = getVisibleFiles(state.convertedFiles, state.search, state.sort);
    state.fileTree = getFileTree(state.visibleFiles);
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
