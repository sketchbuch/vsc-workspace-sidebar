import * as os from 'os';
import { FS_WS_FILETYPE } from '../../constants';
import { WsFiles } from '../../types';
import { collectFilesFromFolder, checkFile } from '.';

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
