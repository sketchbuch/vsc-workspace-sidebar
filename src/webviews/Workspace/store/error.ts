import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspaceErrorPayload, WorkspaceState } from '../..';

export const error = (
  state: WorkspaceState,
  action: PayloadAction<WorkspaceErrorPayload>
): void => {
  state.error = action.payload;
  state.files = false;
  state.isFolderInvalid = false;
  state.state = 'error';
};
