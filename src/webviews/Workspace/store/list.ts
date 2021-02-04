import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspaceFiles, WorkspaceState } from '../..';

export const list = (state: WorkspaceState, action: PayloadAction<WorkspaceFiles>): void => {
  state.files = action.payload;

  if (action.payload === false) {
    state.isFolderInvalid = true;
    state.state = 'invalid';
  } else {
    state.isFolderInvalid = false;
    state.state = 'list';
  }
};
