import { checkFile } from '.';
import { WsFiles } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

export const getFilenamesOfType = (
  requiredType: 'folders' | 'files',
  filenames: WsFiles,
  folder: string,
  fileType: string
) => {
  return filenames.reduce((allFiles, curFile) => {
    const curPath = `${folder}/${curFile}`;
    const { isFile, isFolder } = checkFile(`${folder}/${curFile}`);

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
