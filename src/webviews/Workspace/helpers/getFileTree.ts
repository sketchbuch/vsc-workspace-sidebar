import * as pathLib from 'path';
import { getFolderConfig } from '../../../config/getConfig';
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment';
import { Files } from '../WorkspaceViewProvider.interface';

export interface FileTree {
  files: Files;
  folderPath: string; // Used to help ID closed folders
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
          const newFolder: FileTree = folderList[folderPath] ?? {
            files: [],
            folderPath,
            label: part,
            sub: [],
          };

          if (folderList[folderPath] === undefined) {
            folderList[folderPath] = newFolder; // Reference for future iterations
            branch.push(newFolder);
          }

          // Ignore final folders and just add workspaces as files, then reset branch to root
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
