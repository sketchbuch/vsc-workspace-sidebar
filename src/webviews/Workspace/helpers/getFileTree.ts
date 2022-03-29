import * as pathLib from 'path';
import { getCondenseFileTreeConfig, getFolderConfig } from '../../../config/getConfig';
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment';
import { Files } from '../WorkspaceViewProvider.interface';
import { condenseTree } from './condenseTree';

export type FileTrees = FileTree[];

export interface FileTree {
  files: Files;
  folderPath: string; // Used to help ID closed folders
  isRoot: boolean;
  label: string;
  sub: FileTrees;
}

type FolderList = {
  [key: string]: FileTree;
};

export const getFileTree = (files: Files): FileTree => {
  const condense = getCondenseFileTreeConfig();
  const configFolder = getFolderConfig();
  const rootFolder = getLastPathSegment(configFolder);

  let tree: FileTree = {
    files: [],
    folderPath: rootFolder,
    isRoot: true,
    label: rootFolder,
    sub: [],
  };

  const folderList: FolderList = {};

  const rootFiles = tree.files;
  const rootBranch = tree.sub;
  let branch: FileTree[] = rootBranch;

  files.forEach((file) => {
    const { path } = file;
    const parts = path.split(pathLib.sep);
    let folderPath = '';

    if (parts.length === 1 && !file.path) {
      // Workspace files in the config folder root, not in subfolders
      rootFiles.push({ ...file });
    } else {
      while (parts.length) {
        let part = parts.shift();

        if (part) {
          folderPath = folderPath ? `${folderPath}${pathLib.sep}${part}` : part;

          // Either the existing folder, or a new one
          const folder: FileTree = folderList[folderPath] ?? {
            files: [],
            folderPath,
            isRoot: false,
            label: part,
            sub: [],
          };

          if (folderList[folderPath] === undefined) {
            folderList[folderPath] = folder; // Reference for future iterations
            branch.push(folder);
          }

          if (parts.length) {
            branch = folder.sub;
          } else {
            folder.files.push({ ...file });
            branch = rootBranch;
          }
        }
      }
    }
  });

  return condense === true ? condenseTree(tree) : tree;
};
