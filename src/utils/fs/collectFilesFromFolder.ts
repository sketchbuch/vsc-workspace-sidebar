import * as fs from 'fs';
import { getFilenamesOfType, isHiddenFile } from '.';
import { WsFiles } from '../../types';

export const collectFilesFromFolder = async (
  folder: string,
  fileType: string,
  maxDepth: number,
  curDepth: number
): Promise<WsFiles> => {
  if (curDepth < maxDepth) {
    try {
      const filenames = await fs.promises.readdir(folder).then((files) => {
        return files.filter((file) => !isHiddenFile(file));
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
