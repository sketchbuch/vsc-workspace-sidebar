import { PayloadAction } from '@reduxjs/toolkit'
import { SortIds } from '../../commands/registerCommands'
import { FileTree } from './helpers/getFileTree'

export interface File {
  file: string
  isSelected: boolean
  label: string
  path: string
  showPath: boolean
  [key: string]: string | boolean
}

export type Files = File[]

export interface WorkspaceCache {
  files: WsFiles
  timestamp: number
}

export type WorkspaceErrors = '' | 'FETCH'

// Messages sent by the FE
export enum WorkspacePmActions {
  ERROR_MSG = 'ERROR_MSG',
  FOLDER_CLICK = 'FOLDER_CLICK',
  ICON_CLICK = 'ICON_CLICK',
  ICON_CLICK_FILEMANAGER = 'ICON_CLICK_FILEMANAGER',
  MAIN_CLICK = 'MAIN_CLICK',
  SAVE_WS = 'SAVE_WS',
  SEARCH = 'SEARCH',
  SEARCH_CHECKBOX_DISABLE = 'SEARCH_CHECKBOX_DISABLE',
  SEARCH_CHECKBOX_ENABLE = 'SEARCH_CHECKBOX_ENABLE',
  SHOW_SETTINGS = 'SHOW_SETTINGS',
}

// Messages received by the FE
export enum WorkspacePmClientActions {
  FOCUS_SEARCH = 'FOCUS_SEARCH',
}

export enum WorkspaceSearchCheckboxes {
  CASE_INSENSITIVE = 'CASE_INSENSITIVE',
  MATCH_START = 'MATCH_START',
}

export interface WorkspaceSort {
  sort: SortIds
}

export type FolderState = 'collapse' | 'expand'
export type WorkspacePmPayload = string
export type WorkspacePmPayloadSearchTerm = string
export type WorkspacePmPayloadSearch = Partial<SearchState>
export type WorkspacePmPayloadToggleFolderState = string
export type WorkspaceToggleFolderStateBulk = FolderState

export type FileErrorResult = 'invalid-folder' | 'no-workspaces' | 'none'

export interface SearchState {
  caseInsensitive: boolean
  matchStart: boolean
  term: string
}

export type WorkspaceState = {
  closedFolders: string[]
  convertedFiles: Files
  error: WorkspaceErrors
  files: WorkspaceFiles
  fileTree: FileTree | null
  invalidReason: FileErrorResult
  isFolderInvalid: boolean
  search: SearchState
  selected: string
  sort: SortIds
  state: WorkspaceStates
  treeFolders: string[]
  visibleFiles: Files
  wsType: WsType
}

export type WorkspaceStates = 'error' | 'invalid' | 'list' | 'loading'
export type WsType = 'none' | 'ws' | 'folder'

export type WsFiles = string[]

export type WorkspaceFiles = WsFiles

export type WorkspaceThunkAction<Payload> = PayloadAction<
  Payload,
  string,
  {
    arg: void
    requestId: string
    requestStatus: 'fulfilled'
  },
  never
>
