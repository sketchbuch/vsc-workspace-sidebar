import { WorkspaceState } from '../../webviews';

export const getMockState = (state: Partial<WorkspaceState> = {}): WorkspaceState => {
  return {
    convertedFiles: [],
    error: '',
    files: false,
    isFolderInvalid: false,
    search: '',
    selected: '',
    sort: 'ascending',
    state: 'loading',
    visibleFiles: [],
    ...state,
  };
};
