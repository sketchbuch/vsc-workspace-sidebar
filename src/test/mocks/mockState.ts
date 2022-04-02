import { initialState } from '../../webviews/Workspace/store/workspaceSlice';
import { WorkspaceState } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

export const getMockState = (state: Partial<WorkspaceState> = {}): WorkspaceState => {
  return {
    ...initialState,
    selected: '',
    wsType: 'ws',
    ...state,
  };
};
