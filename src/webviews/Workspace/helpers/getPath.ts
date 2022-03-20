export const getPath = (
  wsFile: string,
  lastSlashIndex: number,
  configFolder: string,
  osHomeDir: string
): string => {
  const cleanedFolder = configFolder.replace(osHomeDir, '~');

  return wsFile
    .substring(0, lastSlashIndex)
    .replace(osHomeDir, '~')
    .replace(cleanedFolder, '')
    .replace(/^\//, ''); // Remove leading slash if there is one
};
