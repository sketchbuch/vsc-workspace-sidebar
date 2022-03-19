import { PayloadAction } from '@reduxjs/toolkit';
import { WorkspaceState, WorkspaceToggleFolderStateBulk } from '../..';
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree';
import { getFileTree } from '../helpers/getFileTree';

export const toggleFolderStateBulk = (
  state: WorkspaceState,
  action: PayloadAction<WorkspaceToggleFolderStateBulk>
): void => {
  if (action.payload === 'expand') {
    state.closedFolders = [];
  } else if (action.payload === 'collapse') {
    const tree = getFileTree(state.visibleFiles);
    const folders = getAllFoldersFromTree(tree);

    state.closedFolders = [...folders];
  }
};
