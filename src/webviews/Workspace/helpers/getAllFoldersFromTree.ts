import { FileTree } from '../helpers/getFileTree';

export const getAllFoldersFromTree = (tree: FileTree): string[] => {
  let branch: string[] = [];

  Object.entries(tree).forEach(([key, value]) => {
    const { folderPath, sub } = value;
    branch.push(folderPath);

    if (Object.keys(sub).length) {
      branch = [...branch, ...getAllFoldersFromTree(sub)];
    }
  });

  return branch;
};
