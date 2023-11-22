import { workspace } from 'vscode'
import { CONFIG_CONDENSE_FILETREE, CONFIG_SHOW_HIERARCHY } from '../constants/config'

export const getCondenseFileTreeConfig = (): boolean => {
  return (
    workspace.getConfiguration().get<boolean>('workspaceSidebar.condenseFileTree') ??
    CONFIG_CONDENSE_FILETREE
  )
}

export const getShowTreeConfig = (): boolean => {
  return (
    workspace.getConfiguration().get<boolean>('workspaceSidebar.showFolderHierarchy') ??
    CONFIG_SHOW_HIERARCHY
  )
}
