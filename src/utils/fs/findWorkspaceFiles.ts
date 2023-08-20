import * as os from 'os';
import { getDepthConfig, getFolderConfig } from '../../config/getConfig';
import { FS_WS_FILETYPE } from '../../constants/fs';
import {
  FileErrorResult,
  WorkspaceFiles,
} from '../../webviews/Workspace/WorkspaceViewProvider.interface';
import { checkFile } from './checkFile';
import { collectFilesFromFolder } from './collectFilesFromFolder';

export interface FindWorkspaceFiles {
  files: WorkspaceFiles;
  result: FileErrorResult;
}

export const findWorkspaceFiles = async (): Promise<FindWorkspaceFiles> => {
  const folder = getFolderConfig();
  const maxDepth = getDepthConfig();
  const homeDir = os.homedir();
  const baseFolder = folder ? folder.replace(`~`, homeDir) : homeDir;
  const { isFolder } = checkFile(baseFolder);

  if (isFolder) {
    const files = await collectFilesFromFolder(baseFolder, FS_WS_FILETYPE, maxDepth, 0);
    return Promise.resolve({ files: files, result: files.length > 0 ? 'none' : 'no-workspaces' });
  }

  return Promise.resolve({ files: [], result: 'invalid-folder' });
};
