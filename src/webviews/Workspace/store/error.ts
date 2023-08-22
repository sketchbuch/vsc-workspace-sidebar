import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspaceErrors, WorkspaceState } from '../WorkspaceViewProvider.interface';

export const error = (state: WorkspaceState, action: PayloadAction<WorkspaceErrors>): void => {
  state.error = action.payload;
  state.files = [];
  state.invalidReason = 'none';
  state.isFolderInvalid = false;
  state.state = 'error';
};
