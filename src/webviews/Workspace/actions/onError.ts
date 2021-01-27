import { DoneInvokeEvent } from 'xstate';
import { WorkspaceErrors } from '../..';
import { WorkspaceContext } from '../state.interface';

export const onError = (
  context: WorkspaceContext,
  event: DoneInvokeEvent<WorkspaceErrors>
): WorkspaceContext => {
  console.log('### onError...');
  return {
    error: event.data,
    files: false,
    isFolderInvalid: false,
    selected: context.selected,
    state: 'error',
  };
};
