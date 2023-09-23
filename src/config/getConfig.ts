import { workspace } from 'vscode'
import { ThemeId } from 'vscode-file-theme-processor'
import {
  CONFIG_CLEAN_LABELS,
  CONFIG_CONDENSE_FILETREE,
  CONFIG_DEPTH,
  CONFIG_EXPLORER_COMPACT_FOLDERS,
  CONFIG_FOLDER,
  CONFIG_SEARCH_MINIMUM,
  CONFIG_SHOW_FILE_ICONS,
  CONFIG_SHOW_FILE_ICONS_CONFIG,
  CONFIG_SHOW_HIERARCHY,
  CONFIG_SHOW_ROOT_FOLDER,
  ConfigActions,
  ConfigShowPaths,
} from '../constants/config'
import { FileIconKeysCustom } from '../webviews/webviews.interface'

const { getConfiguration } = workspace

export const getActionsConfig = (): ConfigActions => {
  return getConfiguration().get('workspaceSidebar.actions') ?? ConfigActions.CURRENT_WINDOW
}

export const getCleanLabelsConfig = (): boolean => {
  return getConfiguration().get('workspaceSidebar.cleanLabels') ?? CONFIG_CLEAN_LABELS
}

export const getCondenseFileTreeConfig = (): boolean => {
  return getConfiguration().get('workspaceSidebar.condenseFileTree') ?? CONFIG_CONDENSE_FILETREE
}

export const getDepthConfig = (): number => {
  return getConfiguration().get('workspaceSidebar.depth') ?? CONFIG_DEPTH
}

export const getFolderConfig = (): string => {
  return getConfiguration().get('workspaceSidebar.folder') || CONFIG_FOLDER
}

export const getSearchMinConfig = (): number => {
  return getConfiguration().get('workspaceSidebar.searchMinimum') ?? CONFIG_SEARCH_MINIMUM
}

export const getShowPathsConfig = (): ConfigShowPaths => {
  return getConfiguration().get('workspaceSidebar.showPaths') || ConfigShowPaths.NEVER
}

export const getShowRootFolderConfig = (): boolean => {
  return getConfiguration().get('workspaceSidebar.showRootFolder') || CONFIG_SHOW_ROOT_FOLDER
}

export const getShowTreeConfig = (): boolean => {
  return getConfiguration().get('workspaceSidebar.showFolderHierarchy') ?? CONFIG_SHOW_HIERARCHY
}

export const getShowFileiconConfig = (): boolean => {
  return getConfiguration().get('workspaceSidebar.showFileIcons') ?? CONFIG_SHOW_FILE_ICONS
}

export const getShowFileiconsConfigConfig = (): FileIconKeysCustom => {
  return (
    getConfiguration().get('workspaceSidebar.showFileIconsConfig') ?? CONFIG_SHOW_FILE_ICONS_CONFIG
  )
}

// The following are core config options

export const getExplorerCompactFoldersConfig = (): boolean => {
  return getConfiguration().get('explorer.compactFolders') ?? CONFIG_EXPLORER_COMPACT_FOLDERS
}

export const getFileiconThemeConfig = (): ThemeId => {
  return getConfiguration('workbench').iconTheme
}
