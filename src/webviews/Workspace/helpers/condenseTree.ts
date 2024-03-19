import { FileTree, FileTrees } from '../WorkspaceViewProvider.interface'

/**
 * This will restructure the tree. If a folder has no subfolders,
 * but has 1 file, this file will be added to the parent folder's files
 * and the subfolder is removed from the tree.
 *
 * This can greatly reduce the visual clutter if you store your workspaces in the project folder
 * and have only one workspace in a folder.
 */
export const condenseTree = (tree: FileTree): FileTree => {
  if (tree.sub.length > 0) {
    tree.sub = tree.sub.reduce((newSubs: FileTrees, curSub: FileTree) => {
      if (curSub.sub.length < 1 && curSub.files.length === 1) {
        tree.files = [...tree.files, ...curSub.files]

        return newSubs
      }

      newSubs.push(condenseTree(curSub))

      return newSubs
    }, [])
  }

  return tree
}
