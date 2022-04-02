import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspaceState, WorkspaceToggleFolderStateBulk } from '../WorkspaceViewProvider.interface';

export const toggleFolderStateBulk = (
  state: WorkspaceState,
  action: PayloadAction<WorkspaceToggleFolderStateBulk>
): void => {
  if (action.payload === 'expand' && state.closedFolders.length) {
    state.closedFolders = [];
  } else if (
    action.payload === 'collapse' &&
    state.visibleFiles.length &&
    state.treeFolders.length > 0
  ) {
    if (state.closedFolders.length !== state.treeFolders.length) {
      state.closedFolders = [...state.treeFolders];
    }
  }
};
