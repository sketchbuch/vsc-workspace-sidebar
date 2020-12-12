import { WsFiles } from '../../types';

export type WorkspaceErrors = '' | 'FETCH';

export type WorkspacePmPayload = {};

export interface WorkspaceState {
  error: WorkspaceErrors;
  files: false | WsFiles;
  isFolderInvalid: boolean;
  state: WorkspaceStates;
}

export type WorkspaceData = WorkspaceState;

export type WorkspaceStates = 'error' | 'invalid' | 'list' | 'loading';
