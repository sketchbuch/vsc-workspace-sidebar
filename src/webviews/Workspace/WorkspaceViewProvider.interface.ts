import { PayloadAction } from '@reduxjs/toolkit';
import { SortIds } from '../../commands/registerCommands';
import { FileTree } from './helpers/getFileTree';

export interface File {
  file: string;
  isSelected: boolean;
  label: string;
  path: string;
  showPath: boolean;
  [key: string]: string | boolean;
}

export type Files = File[];

export interface WorkspaceCache {
  files: WsFiles;
  timestamp: number;
}

export type WorkspaceErrors = '' | 'FETCH';

export enum WorkspacePmActions {
  FOCUS_SEARCH = 'FOCUS_SEARCH',
  FOLDER_CLICK = 'FOLDER_CLICK',
  ICON_CLICK = 'ICON_CLICK',
  MAIN_CLICK = 'MAIN_CLICK',
  SAVE_WS = 'SAVE_WS',
  SEARCH = 'SEARCH',
  SHOW_SETTINGS = 'SHOW_SETTINGS',
}

export interface WorkspacePersistedState {
  sort: SortIds;
}

export type FolderState = 'collapse' | 'expand';
export type WorkspacePmPayload = string;
export type WorkspacePmPayloadSearchTerm = string;
export type WorkspacePmPayloadToggleFolderState = string;
export type WorkspaceToggleFolderStateBulk = FolderState;

export type WorkspaceState = {
  closedFolders: string[];
  convertedFiles: Files;
  error: WorkspaceErrors;
  files: WorkspaceFiles;
  fileTree: FileTree;
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
