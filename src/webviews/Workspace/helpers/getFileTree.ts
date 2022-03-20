import * as pathLib from 'path';
import { Files } from '../WorkspaceViewProvider.interface';

export type FileTreeBranch = FileTreeElement | FileTree;

export type FileTreeElement = {
  files: Files;
  folderPath: string;
  sub: FileTree;
};

export interface FileTree {
  [key: string]: FileTreeElement;
}

export const getFileTree = (files: Files, includeFiles: boolean = true): FileTree => {
  let tree: FileTree = {};

  files.forEach((file) => {
    const { path } = file;
    const parts = path.split(pathLib.sep);
    let branch = tree;
    let curPath = '';

    while (parts.length > 1) {
      let part = parts.shift();

      if (part) {
        curPath = curPath ? `${curPath}${pathLib.sep}${part}` : part;

        if (branch[part] === undefined) {
          branch[part] = {
            files: [],
            folderPath: curPath,
            sub: {},
          };
        }

        if (includeFiles && parts.length < 2) {
          branch[part].files.push({ ...file });
        }

        branch = branch[part].sub;
      }
    }
  });

  return tree;
};
