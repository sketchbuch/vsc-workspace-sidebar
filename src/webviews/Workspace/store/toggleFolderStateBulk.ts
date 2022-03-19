import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspaceState, WorkspaceToggleFolderStateBulk } from '../..';

export const toggleFolderStateBulk = (
  state: WorkspaceState,
  action: PayloadAction<WorkspaceToggleFolderStateBulk>
): void => {
  if (action.payload === 'expand') {
    state.closedFolders = [];
  } else {
    // TODO - Get all folders
    state.closedFolders = [];
  }
};
