import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspaceFiles, WorkspaceState } from '../..';
import { convertWsFiles } from '../helpers/convertWsFiles';
import { getVisibleFiles } from '../helpers/getVisibleFiles';

export const list = (state: WorkspaceState, action: PayloadAction<WorkspaceFiles>): void => {
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
