import * as pathLib from 'path';

export const getPath = (wsFile: string, configFolder: string, osHomeDir: string): string => {
  const cleanedFolder = configFolder.replace(osHomeDir, '~');
  const lastSlashIndex = wsFile.lastIndexOf(pathLib.sep);

  return wsFile
    .substring(0, lastSlashIndex)
    .replace(osHomeDir, '~')
    .replace(cleanedFolder, '')
    .replace(/^\//, ''); // Remove leading slash if there is one
};
