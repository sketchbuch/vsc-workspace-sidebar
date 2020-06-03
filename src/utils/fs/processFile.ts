import * as fs from 'fs';

export const processFile = (file: string): { isError: boolean; isFile: boolean } => {
  let isError = false;
  let isFile = false;

  try {
    isFile = !fs.lstatSync(file).isDirectory();
  } catch (error) {
    isError = true;
  }

  return { isError, isFile };
};
