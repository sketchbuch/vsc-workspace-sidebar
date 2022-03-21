import { WorkspaceState } from '../WorkspaceViewProvider.interface';

export const invalid = (state: WorkspaceState): void => {
  state.files = false;
  state.isFolderInvalid = true;
  state.state = 'invalid';
};
