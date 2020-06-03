import * as os from 'os';
import { FS_WS_FILETYPE, FS_MAX_DEPTH } from '../../constants';
import { WsFiles } from '../../types';
import { collectFilesFromFolder } from '.';

export const findWorkspaceFiles = async (): Promise<WsFiles> => {
  const userHome = os.homedir() + '/Dev/vsc';
  return await collectFilesFromFolder(userHome, FS_WS_FILETYPE, FS_MAX_DEPTH, 0);
};
