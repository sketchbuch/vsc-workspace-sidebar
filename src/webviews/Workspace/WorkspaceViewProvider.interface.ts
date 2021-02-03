export interface File {
  file: string;
  label: string;
  path: string;
  selected: boolean;
}

export type Files = File[];

export interface WorkspaceCache {
  files: WsFiles;
  timestamp: number;
}

export type WorkspaceErrors = '' | 'FETCH';

export enum WorkspacePmActions {
  OPEN_CUR_WINDOW = 'OPEN_CUR_WINDOW',
  OPEN_NEW_WINDOW = 'OPEN_NEW_WINDOW',
}

export type WorkspacePmPayload = {
  file?: string;
};

export type WsFiles = string[];

export type WorkspaceStates = 'error' | 'invalid' | 'list' | 'loading';

export type WorkspaceState = {
  error: WorkspaceErrors;
  files: false | WsFiles;
  isFolderInvalid: boolean;
  selected: string;
  state: WorkspaceStates;
};

export type WorkspaceListPayload = false | WsFiles;
export type WorkspaceErrorPayload = WorkspaceErrors;
