import { workspace } from 'vscode'
import { ThemeId } from 'vscode-file-theme-processor'
import { CONFIG_EXPLORER_COMPACT_FOLDERS } from '../constants/config'

export const getExplorerCompactFoldersConfig = (): boolean => {
  return (
    workspace.getConfiguration().get<boolean>('explorer.compactFolders') ??
    CONFIG_EXPLORER_COMPACT_FOLDERS
  )
}

export const getFileiconThemeConfig = (): ThemeId => {
  return workspace.getConfiguration('workbench').iconTheme
}
