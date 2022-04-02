import { PayloadAction } from '@reduxjs/toolkit';
import { getShowTreeConfig } from '../../../config/getConfig';
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree';
import { getFileTree } from '../helpers/getFileTree';
import { getVisibleFiles } from '../helpers/getVisibleFiles';
import { WorkspacePmPayloadSearchTerm, WorkspaceState } from '../WorkspaceViewProvider.interface';

export const setSearchTerm = (
  state: WorkspaceState,
  action: PayloadAction<WorkspacePmPayloadSearchTerm>
): void => {
  const showTree = getShowTreeConfig();

  state.search = action.payload;

  if (state.files.length === 0) {
    state.fileTree = null;
    state.treeFolders = [];
    state.visibleFiles = [];
  } else {
    state.visibleFiles = getVisibleFiles(state.convertedFiles, state.search, state.sort);
    state.fileTree = showTree ? getFileTree(state.visibleFiles) : null;
    state.treeFolders =
      showTree && state.fileTree !== null ? getAllFoldersFromTree(state.fileTree) : [];
  }
};
