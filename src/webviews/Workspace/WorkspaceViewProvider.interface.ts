import { PayloadAction } from '@reduxjs/toolkit';
import { SortIds } from '../../commands/registerCommands.interface';

export interface File {
  file: string;
  isSelected: boolean;
  label: string;
  path: string;
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
  SEARCH = 'SEARCH',
  SHOW_SETTINGS = 'SHOW_SETTINGS',
}

export type WorkspacePmPayload = string;
export interface WorkspacePersistedState {
  sort: SortIds;
}
export type WorkspacePmPayloadSearchTerm = string;

export type WorkspaceState = {
  convertedFiles: Files;
  error: WorkspaceErrors;
  files: WorkspaceFiles;
  isFolderInvalid: boolean;
  search: string;
  selected: string;
  sort: SortIds;
  state: WorkspaceStates;
  visibleFiles: Files;
};

export type WorkspaceStates = 'error' | 'invalid' | 'list' | 'loading';

export type WsFiles = string[];

export type WorkspaceFiles = false | WsFiles;

export type WorkspaceThunkAction<Payload> = PayloadAction<
  Payload,
  string,
  {
    arg: void;
    requestId: string;
    requestStatus: 'fulfilled';
  },
  never
>;
