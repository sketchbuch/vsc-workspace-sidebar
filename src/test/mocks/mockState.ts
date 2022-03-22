import { defaultFileTree } from '../../webviews/Workspace/store/workspaceSlice';
import { WorkspaceState } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

export const getMockState = (state: Partial<WorkspaceState> = {}): WorkspaceState => {
  return {
    closedFolders: [],
    convertedFiles: [],
    error: '',
    files: false,
    fileTree: { ...defaultFileTree },
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
