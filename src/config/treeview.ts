import { workspace } from 'vscode'
import {
  CONFIG_CONDENSE_FILETREE,
  CONFIG_SHOW_HIERARCHY,
  CONFIG_SHOW_ROOT_FOLDER,
} from '../constants/config'

export const getCondenseFileTreeConfig = (): boolean => {
  return (
    workspace.getConfiguration().get('workspaceSidebar.condenseFileTree') ??
    CONFIG_CONDENSE_FILETREE
  )
}

export const getShowRootFolderConfig = (): boolean => {
  return (
    workspace.getConfiguration().get('workspaceSidebar.showRootFolder') || CONFIG_SHOW_ROOT_FOLDER
  )
}

export const getShowTreeConfig = (): boolean => {
  return (
    workspace.getConfiguration().get('workspaceSidebar.showFolderHierarchy') ??
    CONFIG_SHOW_HIERARCHY
  )
}
