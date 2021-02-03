import { WorkspaceState } from '../..';

export const loading = (state: WorkspaceState): void => {
  state.error = '';
  state.files = false;
  state.isFolderInvalid = false;
  state.selected = '';
  state.state = 'loading';
};
