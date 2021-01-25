import { assign, interpret, Machine } from 'xstate';
import { load, onDone, onError, useCache } from './actions';
import { getWorkspaceFiles } from './helpers';
import { WorkspaceContext, WorkspaceEvents, WorkspaceStateSchema } from './state.interface';

const LOAD = {
  actions: 'load',
  target: 'loading',
};

export const workspaceMachine = Machine<WorkspaceContext, WorkspaceStateSchema, WorkspaceEvents>(
  {
    id: 'workspaceMachine',
    context: {
      error: '',
      files: false,
      isFolderInvalid: false,
      state: 'loading',
    },
    initial: 'loading',
    states: {
      error: {
        on: {
          LOAD,
        },
      },
      fetch: {
        invoke: {
          id: 'fetch-workspaces',
          onDone: {
            actions: assign(onDone),
            target: 'list',
          },
          onError: {
            actions: assign(onError),
            target: 'error',
          },
          src: getWorkspaceFiles,
        },
      },
      invalid: {
        on: {
          LOAD,
        },
      },
      list: {
        on: {
          LOAD,
        },
      },
      loading: {
        on: {
          USE_CACHE: {
            actions: 'useCache',
            target: 'list',
          },
          FETCH: 'fetch',
        },
      },
    },
  },
  {
    actions: {
      load: assign(load),
      useCache: assign(useCache),
    },
  }
);

export const workspaceState = interpret(workspaceMachine);
