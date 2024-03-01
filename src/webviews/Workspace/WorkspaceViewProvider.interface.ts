import { PayloadAction, SerializedError } from '@reduxjs/toolkit'

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

/**
 * Root folder object from settings.json
 */
export interface ConfigRootFolderSettings {
  depth?: number
  path: string
}

/**
 * Root folder object returned by getFoldersConfig()
 */
export interface ConfigRootFolder {
  /**
   * The depth for this folder, if absent in config or NAN, the default depth (workspaceSidebar.depth) will be used instead.
   * Also the config depth will be constrained in value to min/max values of workspaceSidebar.depth.
   */
  depth: number
  path: string
}

export interface WorkspaceSetCacheData {
  folderPath: string
  files: WorkspaceFiles
}

export interface WorkspaceRootFolderMachineCache {
  /**
   * VSCode Env app root.
   */
  appRoot: string
  /**
   * The hash for the remoteName, and appRoot. Used as a key to identify caches for a particular machine.
   */
  cacheId: string
  /**
   * VSCode Env remote name. Now that rootFolders config is machine scoped, we need different caches.
   */
  remoteName: string
  rootFolders: WorkspaceCacheRootFolder[]
  /**
   * The version of this Workspace Sidebar that this cache was made by, to help invalidate caches.
   */
  version: string
}

export interface WorkspaceRootFolderCache {
  caches: WorkspaceRootFolderMachineCache[]
}

export interface WorkspaceCacheRootFolder {
  depth: number
  folderPath: string
  files: WorkspaceFiles
}

export type WorkspaceCacheRootFolders = WorkspaceCacheRootFolder[]

export type WorkspaceErrors = '' | 'DEFAULT' | 'FETCH'

export type ViewLinkType =
  | 'DEPTH'
  | 'EXCLUDE_FOLDERS'
  | 'EXCLUDE_HIDDEN_FOLDERS'
  | 'ROOT_FOLDERS'
  | 'SETTINGS'

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

export type FindFileResult =
  | 'is-file'
  | 'is-hidden-excluded'
  | 'no-root-folders'
  | 'no-workspaces'
  | 'nonexistent'
  | 'ok'

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
   * The results as returned from findAllRootFolderFiles()
   */
  workspaceData: FindRootFolderFiles[]
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
  depth: number
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

/**
 * Find Root Folder Files
 */

export interface FindRootFolderFiles {
  /**
   * The depth for this root folder.
   */
  depth: number
  files: WorkspaceFiles
  /**
   * The folder with ~ replaced with the users homedir
   */
  folderPath: string
  result: FindFileResult
}

export type FindRootFolderFilesConfig = {
  excludedFolders: string[]
  excludeHiddenFolders: boolean
  folder: string
  homeDir: string
  maxDepth: number
}

/**
 * File Tree
 */

export type FileTrees = FileTree[]

export interface FileTree {
  files: Files
  /**
   * Absolute path to the folder
   */
  folderPath: string
  /**
   * Used to help ID closed folders
   */
  folderPathSegment: string
  isRoot: boolean
  label: string
  sub: FileTrees
}

export type FolderList = {
  [key: string]: FileTree
}
