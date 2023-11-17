import { FileTree } from '../helpers/getFileTree'

export const getAllFoldersFromTree = (tree: FileTree): string[] => {
  let folders: string[] = []

  //if (!tree.isRoot) {
  folders.push(tree.folderPathSegment)
  //}

  if (tree.sub.length > 0) {
    tree.sub.forEach((folder) => {
      folders.push(folder.folderPathSegment)

      if (folder.sub) {
        folder.sub.forEach((subfolder) => {
          folders = [...folders, ...getAllFoldersFromTree(subfolder)]
        })
      }
    })
  }

  return folders
}
