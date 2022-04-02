import { getShowTreeConfig } from '../../../config/getConfig';
import { getFileTree } from '../helpers/getFileTree';
import { getVisibleFiles } from '../helpers/getVisibleFiles';
import { WorkspaceState } from '../WorkspaceViewProvider.interface';
import { getDefaultFileTree } from './workspaceSlice';

export const setVisibleFiles = (state: WorkspaceState): void => {
  if (state.files !== false) {
    const showTree = getShowTreeConfig();

    state.visibleFiles = getVisibleFiles(state.convertedFiles, state.search, state.sort);
    state.fileTree = showTree ? getFileTree(state.visibleFiles) : getDefaultFileTree();
  }
};
