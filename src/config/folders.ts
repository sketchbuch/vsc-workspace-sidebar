import { workspace } from 'vscode'
import { CONFIG_EXCLUDED_FOLDERS, CONFIG_FOLDER } from '../constants/config'

export const getFolderConfig = (): string => {
  return workspace.getConfiguration().get('workspaceSidebar.folder') || CONFIG_FOLDER
}

export const getExcludedFoldersConfig = (): string[] => {
  return (
    workspace.getConfiguration().get('workspaceSidebar.folders.excluded') ?? CONFIG_EXCLUDED_FOLDERS
  )
}
