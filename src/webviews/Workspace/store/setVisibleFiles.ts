import { WorkspaceState } from '../..';
import { getVisibleFiles } from '../helpers/getVisibleFiles';

export const setVisibleFiles = (state: WorkspaceState): void => {
  if (state.files !== false) {
    state.visibleFiles = getVisibleFiles(state.convertedFiles, state.search, state.sort);
  }
};
