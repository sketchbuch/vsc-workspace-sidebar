import * as path from 'path';
import { WsFiles } from '../../webviews/Workspace/WorkspaceViewProvider.interface';
import { checkFile } from './checkFile';

export const getFilenamesOfType = (
  requiredType: 'folders' | 'files',
  filenames: WsFiles,
  folder: string,
  fileType: string
) => {
  return filenames.reduce((allFiles, curFile) => {
    const curPath = path.join(folder, curFile);
    const { isFile, isFolder } = checkFile(curPath);

    if (isFile && requiredType === 'files') {
      var fileExtension = curFile.substring(curFile.lastIndexOf('.') + 1);
      if (fileExtension === fileType) {
        return [...allFiles, curPath];
      }
    } else if (isFolder && requiredType === 'folders') {
      return [...allFiles, curPath];
    }

    return allFiles;
  }, [] as WsFiles);
};
