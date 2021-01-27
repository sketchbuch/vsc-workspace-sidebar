import { DoneInvokeEvent } from 'xstate';
import { WsFiles } from '../..';
import { WorkspaceContext } from '../state.interface';

export const onDone = (
  context: WorkspaceContext,
  event: DoneInvokeEvent<WsFiles>
): WorkspaceContext => {
  if (event.data) {
    console.log('### onDone - list...');
    return {
      error: '',
      files: event.data,
      isFolderInvalid: false,
      selected: context.selected,
      state: 'list',
    };
  }

  console.log('### onDone - invalid...');
  return {
    error: '',
    files: false,
    isFolderInvalid: true,
    selected: context.selected,
    state: 'invalid',
  };
};
