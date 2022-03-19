import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspaceState, WorkspaceToggleFolderStateBulk } from '../..';
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree';

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
