import { PayloadAction } from '@reduxjs/toolkit'
import { SortIds } from '../../commands/registerCommands'
import { FileTree } from './helpers/getFileTree'

export interface File {
  cleanedLabel: string
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

export type AllRootFoldersResult = 'no-root-folders' | 'partial-success' | 'success'

export type FindFileResult = 'invalid-folder' | 'no-root-folders' | 'no-workspaces' | 'ok'

export interface SearchState {
  caseInsensitive: boolean
  matchStart: boolean
  term: string
}

export type WorkspaceStateCommon = {
  error: WorkspaceErrors
  fileTree: FileTree | null
  invalidReason: FindFileResult
  isFolderInvalid: boolean
  search: SearchState
  selected: string
  sort: SortIds
  state: WorkspaceStates
  wsType: WsType
}

export type WorkspaceStateSingleRoot = {
  closedFolders: string[]
  convertedFiles: Files
  files: WorkspaceFiles
  fileTree: FileTree | null
  treeFolders: string[]
  visibleFiles: Files
}

export type WorkspaceStateMultiRootItem = {
  baseFolder: string
  baseFolderLabel: string
} & WorkspaceStateSingleRoot

export type WorkspaceStateMultiRoot = {
  rootFolders: WorkspaceStateMultiRootItem[]
}

export type WorkspaceState = WorkspaceStateCommon &
  WorkspaceStateSingleRoot &
  WorkspaceStateMultiRoot

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
