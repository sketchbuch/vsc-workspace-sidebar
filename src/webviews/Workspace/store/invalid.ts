import { WorkspaceState } from '../..';

export const invalid = (state: WorkspaceState): void => {
  state.error = '';
  state.files = false;
  state.isFolderInvalid = true;
  state.state = 'invalid';
};
