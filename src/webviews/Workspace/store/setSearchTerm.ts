import { PayloadAction } from '@reduxjs/toolkit';
import { getShowTreeConfig } from '../../../config/getConfig';
import { getFileTree } from '../helpers/getFileTree';
import { getVisibleFiles } from '../helpers/getVisibleFiles';
import { WorkspacePmPayloadSearchTerm, WorkspaceState } from '../WorkspaceViewProvider.interface';
import { getDefaultFileTree } from './workspaceSlice';

export const setSearchTerm = (
  state: WorkspaceState,
  action: PayloadAction<WorkspacePmPayloadSearchTerm>
): void => {
  const showTree = getShowTreeConfig();

  state.search = action.payload;

  if (state.files === false) {
    state.visibleFiles = [];
    state.fileTree = getDefaultFileTree();
  } else {
    state.visibleFiles = getVisibleFiles(state.convertedFiles, state.search, state.sort);
    state.fileTree = showTree ? getFileTree(state.visibleFiles) : getDefaultFileTree();
  }
};
