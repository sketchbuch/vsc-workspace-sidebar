import { PayloadAction } from '@reduxjs/toolkit';
import { getShowTreeConfig } from '../../../config/getConfig';
import { convertWsFiles } from '../helpers/convertWsFiles';
import { getFileTree } from '../helpers/getFileTree';
import { getVisibleFiles } from '../helpers/getVisibleFiles';
import { WorkspaceFiles, WorkspaceState } from '../WorkspaceViewProvider.interface';
import { getDefaultFileTree } from './workspaceSlice';

export const list = (state: WorkspaceState, action: PayloadAction<WorkspaceFiles>): void => {
  const showTree = getShowTreeConfig();

  state.files = action.payload;
  state.convertedFiles = action.payload ? convertWsFiles(action.payload, state.selected) : [];

  if (state.files === false) {
    state.isFolderInvalid = true;
    state.state = 'invalid';
    state.visibleFiles = [];
    state.fileTree = getDefaultFileTree();
  } else {
    state.isFolderInvalid = false;
    state.state = 'list';
    state.visibleFiles = getVisibleFiles(state.convertedFiles, state.search, state.sort);
    state.fileTree = showTree ? getFileTree(state.visibleFiles) : getDefaultFileTree();
  }
};
