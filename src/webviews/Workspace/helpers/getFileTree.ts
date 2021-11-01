import * as pathLib from 'path';
import { Files } from '../WorkspaceViewProvider.interface';

export interface FileTree {
  [key: string]: FileTree;
}

export const getFileTree = (files: Files): FileTree => {
  let tree: FileTree = {};

  files.forEach((file) => {
    const { path } = file;
    const parts = path.split(pathLib.sep);
    let branch = tree;

    while (parts.length) {
      let part = parts.shift();

      if (part) {
        if (branch[part] === undefined) {
          branch[part] = {};
        }

        branch = branch[part];
      }
    }
  });

  console.log('### tree', tree);

  return tree;
};
