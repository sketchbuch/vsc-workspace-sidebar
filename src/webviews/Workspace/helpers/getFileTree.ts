import * as pathLib from 'path';
import { Files } from '../WorkspaceViewProvider.interface';

export interface FileTree {
  [key: string]: FileTree | null;
}

export const getFileTree = (files: Files): FileTree => {
  let tree: FileTree | null = {};

  files.forEach((file) => {
    const { path } = file;
    const parts = path.split(pathLib.sep);
    let branch = tree;

    while (parts.length) {
      let part = parts.shift();

      if (part) {
        if (branch === null) {
          branch = {};
        }

        if (branch[part] === undefined) {
          if (parts.length < 1) {
            branch[part] = null;
          } else {
            branch[part] = {};
          }
        }

        branch = branch[part];
      }
    }
  });

  return tree;
};
