import * as os from 'os';
import * as vscode from 'vscode';
import { checkFile, collectFilesFromFolder } from '.';
import { FS_WS_FILETYPE } from '../../constants';
import { WsFiles } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

export const findWorkspaceFiles = async (): Promise<WsFiles | false> => {
  const folder: string = vscode.workspace.getConfiguration().get('workspaceSidebar.folder') || '';
  const maxDepth: number = vscode.workspace.getConfiguration().get('workspaceSidebar.depth') || 0;
  const homeFolder = os.homedir();
  // TODO - make sure OS safe
  const baseFolder = folder.replace('~/', `${homeFolder}/`) || homeFolder;
  const { isFolder } = checkFile(baseFolder);

  if (isFolder) {
    return await collectFilesFromFolder(baseFolder, FS_WS_FILETYPE, maxDepth, 0);
  }

  return Promise.resolve(false);
};
