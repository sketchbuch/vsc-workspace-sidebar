import { WorkspaceContext, WorkspaceEvents } from '../state.interface';

export const load = (context: WorkspaceContext, event: WorkspaceEvents): WorkspaceContext => {
  console.log('### load...');
  return {
    error: '',
    files: false,
    isFolderInvalid: false,
    selected: context.selected,
    state: 'loading',
  };
};
