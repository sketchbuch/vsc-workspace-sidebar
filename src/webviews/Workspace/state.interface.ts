import { Interpreter } from 'xstate';
import { GenericObject } from '../../types';
import { WorkspaceErrors, WorkspaceStates, WsFiles } from './WorkspaceViewProvider.interface';

export interface WorkspaceStateSchema {
  states: {
    error: GenericObject;
    fetch: GenericObject;
    invalid: GenericObject;
    list: GenericObject;
    loading: GenericObject;
  };
}

export type WorkspaceEvents =
  | { type: 'ERROR' }
  | { type: 'FETCH' }
  | { type: 'LOAD' }
  | { type: 'LOADED' }
  | { type: 'USE_CACHE'; cachedFiles: WsFiles };

export type WorkspaceContext = {
  error: WorkspaceErrors;
  files: false | WsFiles;
  isFolderInvalid: boolean;
  selected: string;
  state: WorkspaceStates;
};

export type WorkspaceMachine = Interpreter<
  WorkspaceContext,
  WorkspaceStateSchema,
  WorkspaceEvents,
  {
    value: any;
    context: WorkspaceContext;
  }
>;
