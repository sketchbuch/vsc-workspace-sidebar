export const isHiddenFile = (fileName: string): boolean => {
  if (fileName.substring(0, 1) === '.') {
    return true;
  }

  return false;
};
