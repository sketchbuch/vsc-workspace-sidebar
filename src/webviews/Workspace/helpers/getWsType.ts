import { Uri, WorkspaceFolder } from 'vscode'
import { WorkspaceType } from '../WorkspaceViewProvider.interface'

export const getWsType = (
  workspaceFile: Uri | undefined,
  workspaceFolders: readonly WorkspaceFolder[] | undefined
): WorkspaceType => {
  if (workspaceFile) {
    if (workspaceFile?.scheme === 'untitled') {
      return 'folder'
    }

    return 'ws'
  } else if (workspaceFolders) {
    return 'folder'
  }

  return 'none'
}
