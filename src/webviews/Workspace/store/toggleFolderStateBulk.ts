import { PayloadAction } from '@reduxjs/toolkit';
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree';
import { WorkspaceState, WorkspaceToggleFolderStateBulk } from '../WorkspaceViewProvider.interface';

export const toggleFolderStateBulk = (
  state: WorkspaceState,
  action: PayloadAction<WorkspaceToggleFolderStateBulk>
): void => {
  if (action.payload === 'expand' && state.closedFolders.length) {
    state.closedFolders = [];
  } else if (action.payload === 'collapse' && state.visibleFiles.length) {
    const folders = getAllFoldersFromTree(state.fileTree);

    if (state.closedFolders.length !== folders.length) {
      state.closedFolders = [...folders];
    }
  }
};
