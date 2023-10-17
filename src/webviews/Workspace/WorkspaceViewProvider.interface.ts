import { PayloadAction, SerializedError } from '@reduxjs/toolkit'
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

export interface WorkspaceRootFolderCache {
  rootFolders: WorkspaceCacheRootFolder[]
}

export interface WorkspaceCacheRootFolder {
  folderPath: string
  files: WorkspaceFiles
}

export type WorkspaceCacheRootFolders = WorkspaceCacheRootFolder[]

export type WorkspaceErrors = '' | 'DEFAULT' | 'FETCH'

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

export type FindFileResult = 'invalid-folder' | 'no-root-folders' | 'no-workspaces' | 'none'

export interface SearchState {
  caseInsensitive: boolean
  matchStart: boolean
  term: string
}

export type WorkspaceStateErrorObj = SerializedError | null

export type WorkspaceState = {
  error: WorkspaceErrors
  errorObj: WorkspaceStateErrorObj
  fileCount: number
  invalidReason: FindFileResult
  isFolderInvalid: boolean
  rootFolders: WorkspaceStateRootFolder[]
  search: SearchState
  selected: string
  sort: SortIds
  view: WorkspaceView
  visibleFileCount: number
  wsType: WorkspaceType
}

export type WorkspaceStateRootFolder = {
  closedFolders: string[]
  convertedFiles: Files
  files: WorkspaceFiles
  fileTree: FileTree | null
  folderName: string
  /**
   * The folder with ~ replaced with the users homedir
   */
  folderPath: string
  treeFolders: string[]
  visibleFiles: Files
}

export type WorkspaceView = 'error' | 'invalid' | 'list' | 'loading'

export type WorkspaceType = 'none' | 'ws' | 'folder'

export type WorkspaceFiles = string[]

export type WorkspaceThunkAction<Payload, Meta> = PayloadAction<Payload, ActionType, Meta>

export type WorkspaceThunkErrorAction<Payload, Meta> = PayloadAction<
  Payload,
  ActionType,
  Meta,
  SerializedError
>

type ActionMetaCommon = {
  aborted?: boolean
  arg?: void
  condition?: boolean
  rejectedWithValue?: boolean
  requestId: string
}

export type ActionMetaFulfilled = {
  requestStatus: 'fulfilled'
} & ActionMetaCommon

export type ActionMetaPending = {
  requestStatus: 'pending'
} & ActionMetaCommon

export type ActionMetaRejected = {
  requestStatus: 'rejected'
} & ActionMetaCommon

type ActionType = string
