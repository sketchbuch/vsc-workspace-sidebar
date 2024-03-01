import * as path from 'path'
import { FileTree } from '../WorkspaceViewProvider.interface'

export const isTreeFolderCompacted = (tree: FileTree): boolean => {
  return tree.label.includes(path.sep)
}
