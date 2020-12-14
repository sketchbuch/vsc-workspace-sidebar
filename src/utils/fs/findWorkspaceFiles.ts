import * as os from 'os';
import { checkFile, collectFilesFromFolder } from '.';
import { FS_WS_FILETYPE } from '../../constants';
import { WsFiles } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

export const findWorkspaceFiles = async (
  folder: string,
  maxDepth: number
): Promise<WsFiles | false> => {
  const homeFolder = os.homedir();
  const baseFolder = folder.replace('~/', `${homeFolder}/`) || homeFolder;
  const { isFolder } = checkFile(baseFolder);

  if (isFolder) {
    return await collectFilesFromFolder(baseFolder, FS_WS_FILETYPE, maxDepth, 0);
  }

  return Promise.resolve(false);
};
