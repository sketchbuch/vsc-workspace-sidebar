import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspaceListPayload, WorkspaceState } from '../..';

export const list = (state: WorkspaceState, action: PayloadAction<WorkspaceListPayload>): void => {
  state.error = '';
  state.files = action.payload;
  state.isFolderInvalid = false;
  state.state = 'list';
};
