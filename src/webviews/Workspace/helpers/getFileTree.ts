import * as pathLib from 'path';
import { File, Files } from '../WorkspaceViewProvider.interface';
import { sortFileTree } from './sortFileTree';

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
            branch[part + '_FILE'] = { ...file } as File;
          } else {
            branch[part] = {} as FileTree;
          }
        } else {
          branch[part] = branch[part];
        }

        branch = branch[part] as FileTree;
      }
    }
  });

  getFileTreeNew(files);

  return sortFileTree(tree);
};

export type FileTreeElement = {
  files: Files;
  folderPath: string;
  sub: FileTreeNew;
};

export type FileTreeBranchNew = FileTreeElement | FileTreeNew;

export interface FileTreeNew {
  [key: string]: FileTreeElement;
}

export const getFileTreeNew = (files: Files): FileTreeNew => {
  let tree: FileTreeNew = {};

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

        if (parts.length < 2) {
          branch[part].files.push({ ...file });
        }

        branch = branch[part].sub;
      }
    }
  });

  return tree;
};
