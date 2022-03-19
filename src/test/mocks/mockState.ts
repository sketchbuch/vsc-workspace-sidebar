import { WorkspaceState } from '../../webviews';

export const getMockState = (state: Partial<WorkspaceState> = {}): WorkspaceState => {
  return {
    closedFolders: [],
    convertedFiles: [],
    error: '',
    files: false,
    fileTree: {},
    isFolderInvalid: false,
    search: '',
    selected: '',
    sort: 'ascending',
    state: 'loading',
    visibleFiles: [],
    wsType: 'ws',
    ...state,
  };
};
