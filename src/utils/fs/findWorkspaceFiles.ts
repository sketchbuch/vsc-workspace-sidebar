import * as os from 'os';
import { workspace } from 'vscode';
import { checkFile, collectFilesFromFolder } from '.';
import { CONFIG_DEPTH, CONFIG_FOLDER, FS_WS_FILETYPE } from '../../constants';
import { WsFiles } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

export const findWorkspaceFiles = async (): Promise<WsFiles | false> => {
  const folder: string =
    workspace.getConfiguration().get('workspaceSidebar.folder') || CONFIG_FOLDER;
  const maxDepth: number =
    workspace.getConfiguration().get('workspaceSidebar.depth') || CONFIG_DEPTH;
  const baseFolder = folder.replace(`~`, os.homedir());
  const { isFolder } = checkFile(baseFolder);

  if (isFolder) {
    return await collectFilesFromFolder(baseFolder, FS_WS_FILETYPE, maxDepth, 0);
  }

  return Promise.resolve(false);
};
