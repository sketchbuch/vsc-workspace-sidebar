import * as vscode from 'vscode'
import { getFoldersConfig } from '../../../config/folders'
import { ConfigRootFolderSettings } from '../WorkspaceViewProvider.interface'

export const getNewRootFolderConfig = (
  wsFolders: vscode.WorkspaceFolder[]
): ConfigRootFolderSettings[] => {
  const oldConfigFolders = getFoldersConfig()

  if (wsFolders.length > 0) {
    return [
      ...wsFolders.map(({ uri }) => {
        const newFolder: ConfigRootFolderSettings = {
          path: uri.fsPath,
        }

        return newFolder
      }),
      ...oldConfigFolders,
    ]
  }

  return oldConfigFolders
}
