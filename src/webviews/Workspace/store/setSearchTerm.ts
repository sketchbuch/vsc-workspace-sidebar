import { PayloadAction } from '@reduxjs/toolkit';
import { getFileTree } from '../helpers/getFileTree';
import { getVisibleFiles } from '../helpers/getVisibleFiles';
import { WorkspacePmPayloadSearchTerm, WorkspaceState } from '../WorkspaceViewProvider.interface';
import { defaultFileTree } from './workspaceSlice';

export const setSearchTerm = (
  state: WorkspaceState,
  action: PayloadAction<WorkspacePmPayloadSearchTerm>
): void => {
  state.search = action.payload;

  if (state.files === false) {
    state.visibleFiles = [];
    state.fileTree = { ...defaultFileTree };
  } else {
    state.visibleFiles = getVisibleFiles(state.convertedFiles, state.search, state.sort);
    state.fileTree = getFileTree(state.visibleFiles);
  }
};
