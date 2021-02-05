import { File } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

export const getMockFiles = (
  numOfFiles: number,
  hasPath: boolean = false,
  isSelected: boolean = false
): File[] => {
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
