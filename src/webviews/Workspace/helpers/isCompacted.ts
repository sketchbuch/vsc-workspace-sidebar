import * as path from 'path'
import { FileTree } from '../WorkspaceViewProvider.interface'

export const isCompacted = (tree: FileTree): boolean => {
  return tree.label.includes(path.sep)
}
