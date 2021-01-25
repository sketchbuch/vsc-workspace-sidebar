import { DoneInvokeEvent } from 'xstate';
import { WorkspaceContext } from '../state.interface';

export const onDone = (
  context: WorkspaceContext,
  event: DoneInvokeEvent<any>
): WorkspaceContext => {
  if (event.data) {
    console.log('### onDone - list...');
    return {
      error: '',
      files: event.data,
      isFolderInvalid: false,
      state: 'list',
    };
  }

  console.log('### onDone - invalid...');
  return {
    error: '',
    files: false,
    isFolderInvalid: true,
    state: 'invalid',
  };
};
