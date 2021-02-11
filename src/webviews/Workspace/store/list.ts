import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspaceFiles, WorkspaceState } from '../..';
import { getVisibleFiles } from '../helpers/getVisibleFiles';

export const list = (state: WorkspaceState, action: PayloadAction<WorkspaceFiles>): void => {
  state.files = action.payload;

  if (action.payload === false) {
    state.isFolderInvalid = true;
    state.state = 'invalid';
    state.visibleFiles = [];
  } else {
    state.isFolderInvalid = false;
    state.state = 'list';
    state.visibleFiles = getVisibleFiles(
      [...action.payload],
      state.selected,
      state.search,
      state.sort
    );
  }
};
