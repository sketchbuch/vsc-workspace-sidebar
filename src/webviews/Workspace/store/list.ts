import { PayloadAction } from '@reduxjs/toolkit';
import { convertWsFiles } from '../helpers/convertWsFiles';
import { getFileTree } from '../helpers/getFileTree';
import { getVisibleFiles } from '../helpers/getVisibleFiles';
import { WorkspaceFiles, WorkspaceState } from '../WorkspaceViewProvider.interface';

export const list = (state: WorkspaceState, action: PayloadAction<WorkspaceFiles>): void => {
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
