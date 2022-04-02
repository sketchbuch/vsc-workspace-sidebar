import * as os from 'os';
import { getDepthConfig, getFolderConfig } from '../../config/getConfig';
import { FS_WS_FILETYPE } from '../../constants/fs';
import { WorkspaceFiles } from '../../webviews/Workspace/WorkspaceViewProvider.interface';
import { checkFile } from './checkFile';
import { collectFilesFromFolder } from './collectFilesFromFolder';

export const findWorkspaceFiles = async (): Promise<WorkspaceFiles> => {
  const folder = getFolderConfig();
  const maxDepth = getDepthConfig();
  const homeDir = os.homedir();
  const baseFolder = folder ? folder.replace(`~`, homeDir) : homeDir;
  const { isFolder } = checkFile(baseFolder);

  if (isFolder) {
    return await collectFilesFromFolder(baseFolder, FS_WS_FILETYPE, maxDepth, 0);
  }

  return Promise.resolve([]);
};
