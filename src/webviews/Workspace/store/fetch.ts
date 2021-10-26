import { createAsyncThunk } from '@reduxjs/toolkit';
import { Files, WorkspaceFiles, WorkspaceState, WorkspaceThunkAction } from '../..';
import { findWorkspaceFiles } from '../../../utils';
import { convertWsFiles } from '../helpers/convertWsFiles';
import { getVisibleFiles } from '../helpers/getVisibleFiles';

export const fetch = createAsyncThunk('fetch', findWorkspaceFiles);

const getFileTree = (wsFiles: Files): any[] => {
  const tree = [];

  wsFiles.forEach((file) => {
    console.log('### file path', file.path);
  });

  return [];
};

export const fetchFulfilled = (
  state: WorkspaceState,
  action: WorkspaceThunkAction<WorkspaceFiles>
) => {
  state.files = action.payload;
  state.convertedFiles = action.payload ? convertWsFiles(action.payload, state.selected) : [];

  if (state.files === false) {
    state.fileTree = [];
    state.isFolderInvalid = true;
    state.state = 'invalid';
    state.visibleFiles = [];
  } else {
    state.fileTree = getFileTree(state.convertedFiles);
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
