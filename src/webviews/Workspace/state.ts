import * as vscode from 'vscode';
import { assign, interpret, Machine } from 'xstate';
import { findWorkspaceFiles } from '../../utils';
import { WorkspaceContext, WorkspaceEvents, WorkspaceStateSchema } from './state.interface';

export const getWorkspaceFiles = () => {
  const folder: string = vscode.workspace.getConfiguration().get('workspaceSidebar.folder') || '';
  const depth: number = vscode.workspace.getConfiguration().get('workspaceSidebar.depth') || 0;

  return findWorkspaceFiles(folder, depth).then((wsFiles) => wsFiles);
};

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
          src: getWorkspaceFiles,
          onDone: {
            target: 'list',
            actions: assign((context, event) => {
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
            }),
          },
          onError: {
            target: 'error',
            actions: assign((context, event) => {
              console.log('### onError...');
              return {
                error: event.data,
                files: false,
                isFolderInvalid: false,
                state: 'error',
              };
            }),
          },
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
      load: assign((context, event) => {
        console.log('### load...');
        return {
          error: '',
          files: false,
          isFolderInvalid: false,
          state: 'loading',
        };
      }),
      useCache: assign((context, event) => {
        if (event.type === 'USE_CACHE') {
          return {
            error: '',
            files: event.cachedFiles,
            isFolderInvalid: false,
            state: 'list',
          };
        }

        return context;
      }),
    },
  }
);

export const workspaceState = interpret(workspaceMachine);
