import * as fs from 'fs';
import * as os from 'os';
import { FS_WS_FILETYPE } from '../../constants';
import { WsFiles } from '../../types';
import { collectFilesFromFolder } from '.';

export const findWorkspaceFiles = async (
  folder: string,
  maxDepth: number
): Promise<WsFiles | false> => {
  const homeFolder = os.homedir();
  const baseFolder = folder.replace('~/', `${homeFolder}/`) || homeFolder;

  if (fs.existsSync(baseFolder) && fs.lstatSync(baseFolder).isDirectory()) {
    return await collectFilesFromFolder(baseFolder, FS_WS_FILETYPE, maxDepth, 0);
  }

  return Promise.resolve(false);
};
