import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspaceErrors, WorkspaceState } from '../..';

export const error = (state: WorkspaceState, action: PayloadAction<WorkspaceErrors>): void => {
  state.error = action.payload;
  state.files = false;
  state.isFolderInvalid = false;
  state.state = 'error';
};
