import * as pathLib from 'path';
import { getFolderConfig } from '../../../config/getConfig';
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment';
import { Files } from '../WorkspaceViewProvider.interface';

export type FileTreeElement = {
  files: Files;
  folderPath: string;
  sub: FileTree;
};

export interface FileTree {
  [key: string]: FileTreeElement;
}

export const getFileTree = (files: Files): FileTree => {
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

        if (parts.length < 2) {
          branch[part].files.push({ ...file });
        }

        branch = branch[part].sub;
      }
    }
  });

  getFileTree2(files);

  return tree;
};

export interface FileTree2 {
  files: Files;
  folderPath: string; // Used to help ID closed folders
  label: string;
  sub: FileTree2[];
}

type PartsList = {
  [key: string]: FileTree2;
};

export const getFileTree2 = (files: Files): FileTree2 => {
  const folder = getFolderConfig();
  const rootFolder = getLastPathSegment(folder);

  let tree: FileTree2 = {
    files: [],
    folderPath: rootFolder,
    label: rootFolder,
    sub: [],
  };

  const partsList: PartsList = {};

  const rootFiles = tree.files;
  const rootBranch = tree.sub;
  let branch: FileTree2[] = rootBranch;

  files.forEach((file) => {
    const { path } = file;
    const parts = path.split(pathLib.sep);
    let folderPath = '';

    if (parts.length === 1) {
      // Handle root level workspaces for people who store workspaces wthout subfolders
      rootFiles.push({ ...file });
    } else {
      // Get whole tree. Greater than 1 so that we don't display the very last subfolders in the tree,
      // their workspace files are stored in files[] as a flat list to avoid to much noise from folders with just 1 workspace in
      while (parts.length > 1) {
        let part = parts.shift();

        if (part) {
          folderPath = folderPath ? `${folderPath}${pathLib.sep}${part}` : part;

          // Either the existing folder, or a new one
          const newFolder: FileTree2 = partsList[folderPath] ?? {
            files: [],
            folderPath,
            label: part,
            sub: [],
          };

          if (partsList[folderPath] === undefined) {
            partsList[folderPath] = newFolder; // Reference for future iterations
            branch.push(newFolder);
          }

          // Ignore final folders and just add workspaces as files, the reset branch to root
          if (parts.length < 2) {
            newFolder.files.push({ ...file });
            branch = rootBranch;
          } else {
            branch = newFolder.sub;
          }
        }
      }
    }
  });

  return tree;
};
