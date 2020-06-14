import * as fs from 'fs';

export interface CheckFile {
  isFile: boolean;
  isFolder: boolean;
}

export const checkFile = (file: string): CheckFile => {
  try {
    const isFolder = fs.lstatSync(file).isDirectory();
    return { isFile: !isFolder, isFolder };
  } catch (error) {
    return { isFile: false, isFolder: false };
  }
};
