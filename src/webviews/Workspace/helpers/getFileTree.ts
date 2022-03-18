import * as pathLib from 'path';
import { isFile } from '../../../templates/workspace/snippets/tree';
import { File, Files } from '../WorkspaceViewProvider.interface';

export type FileTreeBranch = FileTree | File;

export interface FileTree {
  [key: string]: FileTreeBranch;
}

export const getFileTree = (files: Files): FileTree => {
  let tree: FileTree = {};

  files.forEach((file) => {
    const { path } = file;
    const parts = path.split(pathLib.sep);
    let branch: FileTreeBranch = tree;

    while (parts.length) {
      let part = parts.shift();

      if (part) {
        if (branch[part] === undefined) {
          if (parts.length < 1) {
            branch[part] = { ...file } as File;
          } else {
            branch[part] = {} as FileTree;
          }
        }

        branch = branch[part] as FileTree;
      }
    }
  });

  return sortFileTreeRoot(tree);
};

const sortFileTreeRoot = (tree: FileTree) => {
  const newTree = Object.entries(tree).sort(([aKey, aValue], [bKey, bValue]) => {
    let aVal = aKey.toLowerCase();
    let bVal = bKey.toLowerCase();

    if (isFile(aValue) && isFile(bValue)) {
      aVal = aValue.label.toLowerCase();
      bVal = bValue.label.toLowerCase();
    } else if (isFile(aValue) && !isFile(bValue)) {
      aVal = aValue.label.toLowerCase();
    } else if (!isFile(aValue) && isFile(bValue)) {
      bVal = bValue.label.toLowerCase();
    }

    if (aVal > bVal) {
      return 1;
    } else if (aVal < bVal) {
      return -1;
    } else {
      return 0;
    }
  });

  return Object.fromEntries(newTree);
};
