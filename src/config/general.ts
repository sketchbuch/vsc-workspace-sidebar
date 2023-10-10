import { workspace } from 'vscode'
import {
  CONFIG_CLEAN_LABELS,
  CONFIG_DEPTH,
  CONFIG_SEARCH_MINIMUM,
  CONFIG_SHOW_FILE_ICONS,
  CONFIG_SHOW_FILE_ICONS_CONFIG,
  ConfigActions,
} from '../constants/config'
import { FileIconKeysCustom } from '../webviews/webviews.interface'

export const getActionsConfig = (): ConfigActions => {
  return (
    workspace.getConfiguration().get('workspaceSidebar.actions') ?? ConfigActions.CURRENT_WINDOW
  )
}

export const getCleanLabelsConfig = (): boolean => {
  return workspace.getConfiguration().get('workspaceSidebar.cleanLabels') ?? CONFIG_CLEAN_LABELS
}

export const getDepthConfig = (): number => {
  return workspace.getConfiguration().get('workspaceSidebar.depth') ?? CONFIG_DEPTH
}

export const getSearchMinConfig = (): number => {
  return workspace.getConfiguration().get('workspaceSidebar.searchMinimum') ?? CONFIG_SEARCH_MINIMUM
}

export const getShowFileiconConfig = (): boolean => {
  return (
    workspace.getConfiguration().get('workspaceSidebar.showFileIcons') ?? CONFIG_SHOW_FILE_ICONS
  )
}

export const getShowFileiconsConfigConfig = (): FileIconKeysCustom => {
  return (
    workspace.getConfiguration().get('workspaceSidebar.showFileIconsConfig') ??
    CONFIG_SHOW_FILE_ICONS_CONFIG
  )
}
