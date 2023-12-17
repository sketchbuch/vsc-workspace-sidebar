import * as vscode from 'vscode'
import { getFoldersConfig } from '../../../config/folders'

export const getNewRootFolderConfig = (wsFolders: vscode.WorkspaceFolder[]): string[] => {
  const oldConfigFolders = getFoldersConfig()

  if (wsFolders.length > 0) {
    return [...wsFolders.map(({ uri }) => uri.fsPath), ...oldConfigFolders]
  }

  return oldConfigFolders
}
