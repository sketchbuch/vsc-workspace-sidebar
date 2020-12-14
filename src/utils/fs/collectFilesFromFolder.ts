import * as fs from 'fs';
import { getFilenamesOfType, isHiddenFile } from '.';
import { WsFiles } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

const foldersToIgnore = ['node_modules', 'out', 'dist', 'build'];

export const collectFilesFromFolder = async (
  folder: string,
  fileType: string,
  maxDepth: number,
  curDepth: number
): Promise<WsFiles> => {
  if (curDepth <= maxDepth) {
    try {
      const filenames = await fs.promises.readdir(folder).then((files) => {
        return files.reduce((allFiles: string[], curFile) => {
          if (!isHiddenFile(curFile) && !foldersToIgnore.includes(curFile)) {
            return [...allFiles, curFile];
          }

          return allFiles;
        }, []);
      });

      const folders = getFilenamesOfType('folders', filenames, folder, fileType);
      let files = getFilenamesOfType('files', filenames, folder, fileType);

      if (folders.length > 0) {
        for (let index = 0; index < folders.length; index++) {
          const subFiles = await collectFilesFromFolder(
            folders[index],
            fileType,
            maxDepth,
            curDepth + 1
          );
          files = [...files, ...subFiles];
        }
      }

      return files;
    } catch (err) {
      return [];
    }
  }

  return [];
};
