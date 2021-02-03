import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspaceFiles, WorkspaceState } from '../..';

export const list = (state: WorkspaceState, action: PayloadAction<WorkspaceFiles>): void => {
  state.error = '';
  state.files = action.payload;
  state.isFolderInvalid = false;
  state.state = 'list';
};
