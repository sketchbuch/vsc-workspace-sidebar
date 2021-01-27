export interface File {
  file: string;
  label: string;
  path: string;
  selected: boolean;
}

export type Files = File[];

export type WorkspaceErrors = '' | 'FETCH';

export enum WorkspacePmActions {
  OPEN_CUR_WINDOW = 'OPEN_CUR_WINDOW',
  OPEN_NEW_WINDOW = 'OPEN_NEW_WINDOW',
}

export type WorkspacePmPayload = {
  file?: string;
};

export interface WorkspaceCache {
  files: WsFiles;
  timestamp: number;
}

export type WorkspaceStates = 'error' | 'invalid' | 'list' | 'loading';

export type WsFiles = string[];
