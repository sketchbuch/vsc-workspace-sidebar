import * as vscode from 'vscode'
import { FS_WS_EXT } from '../../constants/fs'
import { getMockUri } from './mockExtensionUri'

export const getMockWorkspaceFolders = (folderCount = 1): vscode.WorkspaceFolder[] => {
  return [...Array(folderCount).keys()].map((value, index): vscode.WorkspaceFolder => {
    return {
      index: index,
      name: `Folder ${value}`,
      uri: getMockUri(FS_WS_EXT),
    }
  })
}
