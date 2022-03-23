import * as pathLib from 'path';
import { getFolderConfig } from '../../../config/getConfig';
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment';
import { Files } from '../WorkspaceViewProvider.interface';

export interface FileTree {
  files: Files;
  folderPath: string; // Used to help ID closed folders
  isRoot: boolean;
  label: string;
  sub: FileTree[];
}

type FolderList = {
  [key: string]: FileTree;
};

export const getFileTree = (files: Files): FileTree => {
  const folder = getFolderConfig();
  const rootFolder = getLastPathSegment(folder);

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
      // Workspace files in the folder, not in subs
      rootFiles.push({ ...file });
    } else {
      while (parts.length) {
        let part = parts.shift();

        if (part) {
          folderPath = folderPath ? `${folderPath}${pathLib.sep}${part}` : part;

          // Either the existing folder, or a new one
          const newFolder: FileTree = folderList[folderPath] ?? {
            files: [],
            folderPath,
            isRoot: false,
            label: part,
            sub: [],
          };

          if (folderList[folderPath] === undefined) {
            folderList[folderPath] = newFolder; // Reference for future iterations
            branch.push(newFolder);
          }

          if (parts.length) {
            branch = newFolder.sub;
          } else {
            newFolder.files.push({ ...file });
            branch = rootBranch;
          }
        }
      }
    }
  });

  return tree;
};
