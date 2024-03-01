import { FileTree } from '../WorkspaceViewProvider.interface'

export const getAllFoldersFromTree = (tree: FileTree): string[] => {
  let folders: string[] = []

  folders.push(tree.folderPathSegment)

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
