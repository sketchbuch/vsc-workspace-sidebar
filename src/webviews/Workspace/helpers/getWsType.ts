import { Uri, WorkspaceFolder } from 'vscode';
import { WsType } from '../WorkspaceViewProvider.interface';

export const getWsType = (
  workspaceFile: Uri | undefined,
  workspaceFolders: readonly WorkspaceFolder[] | undefined
): WsType => {
  if (workspaceFile) {
    if (workspaceFile?.scheme === 'untitled') {
      return 'folder';
    }

    return 'ws';
  } else if (workspaceFolders) {
    return 'folder';
  }

  return 'none';
};
