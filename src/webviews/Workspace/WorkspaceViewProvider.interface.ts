export interface File {
  file: string;
  label: string;
  path: string;
}

export type Files = File[];

export type WorkspaceErrors = '' | 'FETCH';

export type WorkspacePmPayload = {};

export interface WorkspaceState {
  error: WorkspaceErrors;
  files: false | WsFiles;
  isFolderInvalid: boolean;
  state: WorkspaceStates;
}

export type WorkspaceData = WorkspaceState;

export interface WorkspaceCache {
  files: WsFiles;
  timestamp: number;
}

export type WorkspaceStates = 'error' | 'invalid' | 'list' | 'loading';

export type WsFiles = string[];
