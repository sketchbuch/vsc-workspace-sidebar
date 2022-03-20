import { File } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

interface Config {
  fileType: string; // Without .
  hasPath: boolean;
  isSelected: boolean;
  showPath: boolean;
  path?: string;
}
const defaultConfig = {
  fileType: '',
  hasPath: false,
  isSelected: false,
  showPath: true,
};

export const getMockFiles = (numOfFiles: number, config: Partial<Config> = {}): File[] => {
  const { fileType, hasPath, isSelected, path, showPath }: Config = {
    ...defaultConfig,
    ...config,
  };
  const ext = fileType ? `.${fileType}` : fileType;
  let files: File[] = [];

  for (let index = 0; index < numOfFiles; index++) {
    const fileNum = index + 1;

    files.push({
      file: `file-${fileNum}${ext}`,
      isSelected,
      label: `File ${fileNum}`,
      path: path ?? hasPath ? '/a/path' : '',
      searchLabel: `file ${fileNum}`,
      showPath,
    });
  }

  return files;
};
