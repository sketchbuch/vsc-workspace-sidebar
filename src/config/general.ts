import { workspace } from 'vscode'
import {
  CONFIG_CLEAN_LABELS,
  CONFIG_DEPTH,
  CONFIG_FOCUS_EXPLORER,
  CONFIG_SHOW_FILE_ICONS,
  CONFIG_SHOW_FILE_ICONS_CONFIG,
  ConfigActions,
} from '../constants/config'
import { FileIconKeysCustom } from '../webviews/webviews.interface'

export const getActionsConfig = (): ConfigActions => {
  return (
    workspace.getConfiguration().get<ConfigActions>('workspaceSidebar.actions') ??
    ConfigActions.CURRENT_WINDOW
  )
}

export const getCleanLabelsConfig = (): boolean => {
  return (
    workspace.getConfiguration().get<boolean>('workspaceSidebar.cleanLabels') ?? CONFIG_CLEAN_LABELS
  )
}

export const getDepthConfig = (): number => {
  return workspace.getConfiguration().get<number>('workspaceSidebar.depth') ?? CONFIG_DEPTH
}

export const getFocusExplorerConfig = (): boolean => {
  return (
    workspace.getConfiguration().get<boolean>('workspaceSidebar.focusExplorer') ??
    CONFIG_FOCUS_EXPLORER
  )
}

export const getShowFileiconConfig = (): boolean => {
  return (
    workspace.getConfiguration().get('workspaceSidebar.showFileIcons') ?? CONFIG_SHOW_FILE_ICONS
  )
}

export const getShowFileiconsConfigConfig = (): FileIconKeysCustom => {
  const fiConfig: FileIconKeysCustom =
    workspace.getConfiguration().get<FileIconKeysCustom>('workspaceSidebar.showFileIconsConfig') ??
    CONFIG_SHOW_FILE_ICONS_CONFIG
  const newConfig: FileIconKeysCustom = {}

  Object.keys(fiConfig).forEach((key) => {
    newConfig[key] = [...new Set(fiConfig[key])]
  })

  return newConfig
}
