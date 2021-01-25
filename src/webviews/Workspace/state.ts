import * as vscode from 'vscode';
import { assign, interpret, Machine } from 'xstate';
import { findWorkspaceFiles } from '../../utils';
import { load, onDone, onError, useCache } from './actions';
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
