import { FileTree } from '../WorkspaceViewProvider.interface'

export const isCompactable = (tree: FileTree): boolean => {
  return tree.sub.length === 1 && tree.files.length === 0
}
