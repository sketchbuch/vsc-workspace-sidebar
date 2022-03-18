import { isFile } from '../../../templates/workspace/snippets/tree';
import { FileTree, FileTreeBranch } from './getFileTree';

type FileTreeEntries = [string, FileTreeBranch][];

/**
 * Recursively sorts the file tree, making sure that folders/files on the same level are sorted alphabetically.
 *
 * e.g.
 * /alpha/afolder/tests_alpahabetically.code-workspace
 * /tests/aaa_tests.code-workspace
 * /tests/subfolder/tests.code-workspace
 * /zzzz/old_stuff.code-workspace
 *
 * Would look have this tree:
 *
 * alpha
 *  afolder
 *    Tests Alpahabetically
 * AAAA Tests
 * tests
 *  subfolder
 *    Tests
 * Old Stuff
 *
 * This sort function will reorder the tree like this:
 *
 * AAA Tests
 * alpha
 *  afolder
 *    Tests Alpahabetically
 * Old Stuff
 * tests
 *  subfolder
 *    Tests
 */
export const sortFileTree = (tree: FileTree) => {
  const sortedTreeEntries: FileTreeEntries = Object.entries(tree)
    .sort(([aKey, aValue], [bKey, bValue]) => {
      const aIsFile = isFile(aValue);
      const bIsFile = isFile(bValue);
      let aVal = aKey.toLowerCase();
      let bVal = bKey.toLowerCase();

      if (aIsFile && bIsFile) {
        aVal = aValue.label.toLowerCase();
        bVal = bValue.label.toLowerCase();
      } else if (aIsFile && !bIsFile) {
        aVal = aValue.label.toLowerCase();
      } else if (!aIsFile && bIsFile) {
        bVal = bValue.label.toLowerCase();
      }

      if (aVal > bVal) {
        return 1;
      } else if (aVal < bVal) {
        return -1;
      } else {
        return 0;
      }
    })
    .map((element) => {
      if (!isFile(element[1])) {
        return [element[0], sortFileTree(element[1])];
      }

      return element;
    });

  return Object.fromEntries(sortedTreeEntries);
};
