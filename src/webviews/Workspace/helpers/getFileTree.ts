import * as os from 'os';
import * as pathLib from 'path';
import {
  getCondenseFileTreeConfig,
  getExplorerCompactFoldersConfig,
  getFolderConfig,
} from '../../../config/getConfig';
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment';
import { Files } from '../WorkspaceViewProvider.interface';
import { compactTree } from './compactTree';
import { condenseTree } from './condenseTree';

export type FileTrees = FileTree[];

export interface FileTree {
  files: Files;
  folderPath: string; // Absolute path to the folder
  folderPathSegment: string; // Used to help ID closed folders
  isRoot: boolean;
  label: string;
  sub: FileTrees;
}

type FolderList = {
  [key: string]: FileTree;
};

export const getFileTree = (files: Files): FileTree => {
  const homeDir = os.homedir();
  const condense = getCondenseFileTreeConfig();
  const compact = getExplorerCompactFoldersConfig();
  const configFolder = getFolderConfig();
  const rootFolder = getLastPathSegment(configFolder);

  let tree: FileTree = {
    files: [],
    folderPath: configFolder.replace(`~`, homeDir),
    folderPathSegment: rootFolder,
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
    let folderPathSegment = '';

    if (parts.length === 1 && !file.path) {
      // Workspace files in the config folder root, not in subfolders
      rootFiles.push({ ...file });
    } else {
      while (parts.length) {
        let part = parts.shift();

        if (part) {
          folderPathSegment = folderPathSegment
            ? `${folderPathSegment}${pathLib.sep}${part}`
            : part;
          const cropPos = file.file.indexOf(part) + part.length;

          // Either the existing folder, or a new one
          const folder: FileTree = folderList[folderPathSegment] ?? {
            files: [],
            folderPath: file.file.substring(0, cropPos),
            folderPathSegment,
            isRoot: false,
            label: part,
            sub: [],
          };

          if (folderList[folderPathSegment] === undefined) {
            folderList[folderPathSegment] = folder; // Reference for future iterations
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

  if (condense === true) {
    tree = condenseTree(tree);
  }

  if (compact === true) {
    tree = compactTree(tree);
  }

  return tree;
};
