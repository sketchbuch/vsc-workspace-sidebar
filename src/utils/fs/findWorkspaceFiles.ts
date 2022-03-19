import * as os from 'os';
import { checkFile, collectFilesFromFolder } from '.';
import { getDepthConfig, getFolderConfig } from '../../config/getConfig';
import { FS_WS_FILETYPE } from '../../constants';
import { WsFiles } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

export const findWorkspaceFiles = async (): Promise<WsFiles | false> => {
  const folder = getFolderConfig();
  const maxDepth = getDepthConfig();
  const homeDir = os.homedir();
  const baseFolder = folder ? folder.replace(`~`, homeDir) : homeDir;
  const { isFolder } = checkFile(baseFolder);

  if (isFolder) {
    return await collectFilesFromFolder(baseFolder, FS_WS_FILETYPE, maxDepth, 0);
  }

  return Promise.resolve(false);
};
