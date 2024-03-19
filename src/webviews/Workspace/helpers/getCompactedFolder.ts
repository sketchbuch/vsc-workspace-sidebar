import { CompactedFolder, FileTree } from '../WorkspaceViewProvider.interface'

export const getCompactedFolder = (tree: FileTree): CompactedFolder => {
  const { folderPath, folderPathSegment, label } = tree

  return { folderPath, folderPathSegment, label }
}
