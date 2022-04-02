import { getShowTreeConfig } from '../../../config/getConfig';
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree';
import { getFileTree } from '../helpers/getFileTree';
import { getVisibleFiles } from '../helpers/getVisibleFiles';
import { WorkspaceState } from '../WorkspaceViewProvider.interface';

export const setVisibleFiles = (state: WorkspaceState): void => {
  if (state.files.length > 0) {
    const showTree = getShowTreeConfig();

    state.visibleFiles = getVisibleFiles(state.convertedFiles, state.search, state.sort);
    state.fileTree = showTree ? getFileTree(state.visibleFiles) : null;
    state.treeFolders =
      showTree && state.fileTree !== null ? getAllFoldersFromTree(state.fileTree) : [];
  }
};
