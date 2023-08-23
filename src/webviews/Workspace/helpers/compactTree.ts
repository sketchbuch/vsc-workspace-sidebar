import * as path from 'path';
import { FileTree, FileTrees } from './getFileTree';
import { isTreeFolderCompacted } from './isTreeFolderCompacted';

export const compactTree = (tree: FileTree): FileTree => {
  if (tree.sub.length > 0) {
    tree.sub = tree.sub.reduce((newSubs: FileTrees, curSub: FileTree) => {
      if (curSub.sub.length === 1 && curSub.files.length === 0) {
        const nextLabel = path.join(curSub.label, curSub.sub[0].label);

        newSubs.push(
          compactTree({
            ...curSub.sub[0],
            label: nextLabel,
          })
        );
      } else if (
        curSub.sub.length === 0 &&
        curSub.files.length > 0 &&
        isTreeFolderCompacted(tree)
      ) {
        const nextLabel = path.join(tree.label, curSub.label);
        tree = {
          ...tree,
          label: nextLabel,
          sub: [],
          files: [...curSub.files],
        };
      } else {
        newSubs.push(compactTree(curSub));
      }
      return newSubs;
    }, []);
  }

  return tree;
};
