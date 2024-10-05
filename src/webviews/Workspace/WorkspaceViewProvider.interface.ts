import { SerializedError } from '@reduxjs/toolkit'

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

export type Uuid = string

/**
 * Root folder object from settings.json
 */
export interface ConfigRootFolderSettings {
  depth?: number
  excludeHiddenFolders?: boolean
  path: string
}

/**
 * Root folder object returned by getFoldersConfig()
 */
export interface ConfigRootFolder {
  /**
   * The depth for this folder, if absent in config or NAN, the default depth (workspaceSidebar.depth) will set here instead.
   * Also the config depth will be constrained in value to min/max values of workspaceSidebar.depth.
   */
  depth: number
  /**
   * Should hidden folders be searched? If absent, the default excludeHiddenFolders (workspaceSidebar.excludeHiddenFolders) will set here instead.
   */
  excludeHiddenFolders: boolean
  id: Uuid
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
  /**
   * The ID of the config returned by getFoldersConfig().
   */
  configId: Uuid
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
  ICON_CLICK_REFETCH = 'ICON_CLICK_REFETCH',
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
  | 'loading'
  | 'map-error'
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
  /**
   * The type of error.
   */
  error: WorkspaceErrors

  /**
   * A redux-thunk error object, if any.
   */
  errorObj: WorkspaceStateErrorObj

  /**
   * The result of the file collection for all root folders.
   */
  result: FindFileResult

  /**
   * Root folders searched.
   */
  rootFolders: WorkspaceStateRootFolder[]

  /**
   * Search state.
   */
  search: SearchState

  /**
   * The path to the selected workspace file.
   */
  selected: string

  /**
   * The current view the state is in.
   */
  view: WorkspaceView

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
   * The ID of the config returned by getFoldersConfig().
   */
  configId: Uuid

  /**
   * The files, converted to a form useable by this extension.
   */
  convertedFiles: Files

  /**
   * Search depth.
   */
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
   * The absolute folder path with the users homedir replaced with ~.
   */
  folderPathShort: string

  /**
   * The result of the file collection for this root folder.
   */
  result: FindFileResult

  /**
   * The current state for this root folder.
   */
  state?: 'loading' | 'ready'

  /**
   * The converted files that are currently visible
   */
  visibleFiles: Files
}

export type WorkspaceView = 'error' | 'invalid' | 'list' | 'loading'

export type WorkspaceType = 'none' | 'ws' | 'folder'

export type WorkspaceFiles = string[]

/**
 * Find Root Folder Files
 */

export interface FindRootFolderFiles {
  /**
   * The search depth for this root folder.
   */
  depth: number

  /**
   * The files found within this root folder.
   */
  files: WorkspaceFiles

  /**
   * The folder with ~ replaced with the users homedir
   */
  folderPath: string

  /**
   * The serach result.
   */
  result: FindFileResult
}

export type FindRootFolderFilesConfig = {
  excludedFolders: string[]
  excludeHiddenFolders: boolean
  folder: string
  homeDir: string
  maxDepth: number
}

export type CompactedFolder = Pick<FileTree, 'folderPath' | 'folderPathSegment' | 'label'>

/**
 * A representation of the path to all files.
 */
export type FileTrees = FileTree[]

export interface FileTree {
  /**
   * If this folder is compacted, this is the information about the folders that were compacted to form this folder.
   */
  compactedFolders: CompactedFolder[]

  /**
   * Files in this folder, if any.
   */
  files: Files

  /**
   * Absolute path to the folder.
   */
  folderPath: string

  /**
   * Used to ID closed folders.
   */
  folderPathSegment: string

  /**
   * Is this a root folder?
   */
  isRoot: boolean

  /**
   * The label for the folder.
   */
  label: string

  /**
   * Subfolders, if any.
   */
  sub: FileTrees
}

export type FolderList = {
  [key: string]: FileTree
}
