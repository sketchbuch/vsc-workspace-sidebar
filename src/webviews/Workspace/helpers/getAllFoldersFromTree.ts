import { FileTree } from '../helpers/getFileTree';

// TODO - Put in state now that filetree is too
export const getAllFoldersFromTree = (tree: FileTree): string[] => {
  let folders: string[] = [];

  if (!tree.isRoot) {
    folders.push(tree.folderPath);
  }

  if (tree.sub.length > 0) {
    tree.sub.forEach((folder) => {
      folders.push(folder.folderPath);

      if (folder.sub) {
        folder.sub.forEach((subfolder) => {
          folders = [...folders, ...getAllFoldersFromTree(subfolder)];
        });
      }
    });
  }

  return folders;
};
