import { FileTree } from '../helpers/getFileTree';

// TODO - Put in state now that filetree is too
export const getAllFoldersFromTree = (tree: FileTree): string[] => {
  let folders: string[] = [tree.folderPath];

  if (tree.sub.length > 0) {
    tree.sub.forEach((folder) => {
      folders.push(folder.folderPath);

      if (folder.sub) {
        tree.sub.forEach((subfolder) => {
          folders = [...folders, ...getAllFoldersFromTree(subfolder)];
        });
      }
    });
  }

  return folders;
};
