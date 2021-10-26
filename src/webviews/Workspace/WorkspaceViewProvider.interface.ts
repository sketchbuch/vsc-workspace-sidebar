import { PayloadAction } from '@reduxjs/toolkit';
import { SortIds } from '../../commands/registerCommands';

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
  FOCUS_SEARCH = 'FOCUS_SEARCH',
  ICON_CLICK = 'ICON_CLICK',
  MAIN_CLICK = 'MAIN_CLICK',
  SAVE_WS = 'SAVE_WS',
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
  fileTree: any[];
  isFolderInvalid: boolean;
  search: string;
  selected: string;
  sort: SortIds;
  state: WorkspaceStates;
  visibleFiles: Files;
  wsType: WsType;
};

export type WorkspaceStates = 'error' | 'invalid' | 'list' | 'loading';
export type WsType = 'none' | 'ws' | 'folder';

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
