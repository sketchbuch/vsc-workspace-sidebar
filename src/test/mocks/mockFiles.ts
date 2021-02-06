import { File } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

interface Config {
  hasPath: boolean;
  isSelected: boolean;
}
const defaultConfig = {
  hasPath: false,
  isSelected: false,
};

export const getMockFiles = (numOfFiles: number, config: Partial<Config> = {}): File[] => {
  const { hasPath, isSelected }: Config = {
    ...defaultConfig,
    ...config,
  };
  let files: File[] = [];

  for (let index = 0; index < numOfFiles; index++) {
    const fileNum = index + 1;

    files.push({
      file: `file-${fileNum}`,
      isSelected,
      label: `File ${fileNum}`,
      path: hasPath ? '/a/path' : '',
    });
  }

  return files;
};
