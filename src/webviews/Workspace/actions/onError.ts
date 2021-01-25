import { DoneInvokeEvent } from 'xstate';
import { WorkspaceContext } from '../state.interface';

export const onError = (
  context: WorkspaceContext,
  event: DoneInvokeEvent<any>
): WorkspaceContext => {
  console.log('### onError...');
  return {
    error: event.data,
    files: false,
    isFolderInvalid: false,
    state: 'error',
  };
};
