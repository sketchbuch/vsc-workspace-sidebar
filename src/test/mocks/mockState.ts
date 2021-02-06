import { WorkspaceState } from '../../webviews';

export const getMockState = (state: Partial<WorkspaceState> = {}): WorkspaceState => {
  return {
    error: '',
    files: false,
    isFolderInvalid: false,
    selected: '',
    sort: 'ascending',
    state: 'loading',
    ...state,
  };
};
