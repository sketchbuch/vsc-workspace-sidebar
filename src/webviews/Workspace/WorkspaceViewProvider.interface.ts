import { PayloadAction, SerializedError } from '@reduxjs/toolkit'
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

export type ViewLinkType = 'EXCLUDE_FOLDERS' | 'ROOT_FOLDERS' | 'SETTINGS'

/**
 * Messages sent by the FE
 */
export enum PostMsgActionsBackend {
  ADD_TO_ROOTS = 'ADD_TO_ROOTS',
  ERROR_MSG = 'ERROR_MSG',
  FOLDER_CLICK = 'FOLDER_CLICK',
  ICON_CLICK = 'ICON_CLICK',
  ICON_CLICK_FILEMANAGER = 'ICON_CLICK_FILEMANAGER',
  MAIN_CLICK = 'MAIN_CLICK',
  SAVE_WS = 'SAVE_WS',
  SEARCH = 'SEARCH',
  SEARCH_CHECKBOX_DISABLE = 'SEARCH_CHECKBOX_DISABLE',
  SEARCH_CHECKBOX_ENABLE = 'SEARCH_CHECKBOX_ENABLE',
  VIEW_LINK = 'VIEW_LINK',
}

/**
 * Messages received by the FE
 */
export enum PostMsgActionsFrontend {
  FOCUS_SEARCH = 'FOCUS_SEARCH',
}

export enum WorkspaceSearchCheckboxes {
  CASE_INSENSITIVE = 'CASE_INSENSITIVE',
  MATCH_START = 'MATCH_START',
}
export type FolderState = 'collapse' | 'expand'

export type Payload = string
export type PayloadSearch = Partial<SearchState>
export type PayloadToggleFolderState = {
  folder: string
  folderPath: string
}
export type PayloadToggleFolderStateBulk = FolderState

export type FindFileResult = 'invalid-folder' | 'no-root-folders' | 'no-workspaces' | 'ok'

export interface SearchState {
  caseInsensitive: boolean
  matchStart: boolean
  term: string
}

export type WorkspaceStateErrorObj = SerializedError | null

export type WorkspaceState = {
  error: WorkspaceErrors
  errorObj: WorkspaceStateErrorObj
  /**
   * The total number of workspace files for all root folders.
   */
  fileCount: number
  isFolderInvalid: boolean
  /**
   * The result of the file collection for all root folders.
   */
  result: FindFileResult
  rootFolders: WorkspaceStateRootFolder[]
  search: SearchState
  selected: string
  /**
   * The current view the state is in.
   */
  view: WorkspaceView
  /**
   * The total number of visible workspace files for all root folders.
   */
  visibleFileCount: number
  /**
   * The type of workspace that is currently open.
   */
  wsType: WorkspaceType
}

export type WorkspaceStateRootFolder = {
  /**
   * The names of all folders. Either all folders in the tree, or just the root folder in list view.
   */
  allFolders: string[]
  /**
   * The names of all folders that are closed.
   */
  closedFolders: string[]
  /**
   * The files, converted to a form useable by this extension.
   */
  convertedFiles: Files
  /**
   * An array of absolute file paths to all workspace files.
   */
  files: WorkspaceFiles
  /**
   * A representation of the file tree for rendering - which could be collapsed and/or condensed depending upon settings.
   */
  fileTree: FileTree | null
  /**
   * The name of the actual folder.
   */
  folderName: string
  /**
   * The absolute folder path with ~ replaced with the users homedir.
   */
  folderPath: string
  /**
   * The result of the file collection for this root folder.
   */
  result: FindFileResult
  /**
   * The converted files that are currently visible
   */
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
