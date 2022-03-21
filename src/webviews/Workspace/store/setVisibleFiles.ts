import { getFileTree } from '../helpers/getFileTree';
import { getVisibleFiles } from '../helpers/getVisibleFiles';
import { WorkspaceState } from '../WorkspaceViewProvider.interface';

export const setVisibleFiles = (state: WorkspaceState): void => {
  if (state.files !== false) {
    state.visibleFiles = getVisibleFiles(state.convertedFiles, state.search, state.sort);
    state.fileTree = getFileTree(state.visibleFiles);
  }
};
