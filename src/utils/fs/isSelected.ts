export const isSelected = (file: string, selected: string, platform: string) => {
  if (platform === 'win32') {
    return file.toLowerCase() === selected.toLowerCase();
  }

  return file === selected;
};
