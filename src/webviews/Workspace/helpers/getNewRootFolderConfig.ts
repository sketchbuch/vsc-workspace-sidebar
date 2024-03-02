import * as path from 'path'
import * as vscode from 'vscode'
import { getRawFoldersConfig } from '../../../config/folders'
import { ConfigRootFolderSettings } from '../WorkspaceViewProvider.interface'

export const getNewRootFolderConfig = (workspaceFile: vscode.Uri): ConfigRootFolderSettings[] => {
  console.log('### workspaceFile', workspaceFile)

  return [{ path: path.dirname(workspaceFile.fsPath) }, ...getRawFoldersConfig()]
}
