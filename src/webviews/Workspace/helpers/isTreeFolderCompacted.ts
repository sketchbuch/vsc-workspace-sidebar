import { FileTree } from './getFileTree';
import * as path from 'path';

export const isTreeFolderCompacted = (tree: FileTree): boolean => {
  return tree.label.includes(path.sep);
};
