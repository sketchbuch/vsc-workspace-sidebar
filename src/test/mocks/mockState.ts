import { WorkspaceState } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

export const getMockState = (state: Partial<WorkspaceState> = {}): WorkspaceState => {
  return {
    closedFolders: [],
    convertedFiles: [],
    error: '',
    files: false,
    fileTree: null,
    isFolderInvalid: false,
    search: '',
    selected: '',
    sort: 'ascending',
    state: 'loading',
    treeFolders: [],
    visibleFiles: [],
    wsType: 'ws',
    ...state,
  };
};
