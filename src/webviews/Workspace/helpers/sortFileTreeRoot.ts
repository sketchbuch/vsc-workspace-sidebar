import { isFile } from '../../../templates/workspace/snippets/tree';
import { FileTree } from './getFileTree';

/**
 * If there are WS files on the root level together with folders, and as WS files are displayed by label,
 * they can lool like they are sorted in the wrong order as a label could come alpahabetically before forlders in the tree.
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
 * This sort function will reorder the root level (sublevels are ok as the tree is sorted by path):
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
export const sortFileTreeRoot = (tree: FileTree) => {
  const newTree = Object.entries(tree).sort(([aKey, aValue], [bKey, bValue]) => {
    let aVal = aKey.toLowerCase();
    let bVal = bKey.toLowerCase();

    if (isFile(aValue) && isFile(bValue)) {
      aVal = aValue.label.toLowerCase();
      bVal = bValue.label.toLowerCase();
    } else if (isFile(aValue) && !isFile(bValue)) {
      aVal = aValue.label.toLowerCase();
    } else if (!isFile(aValue) && isFile(bValue)) {
      bVal = bValue.label.toLowerCase();
    }

    if (aVal > bVal) {
      return 1;
    } else if (aVal < bVal) {
      return -1;
    } else {
      return 0;
    }
  });

  return Object.fromEntries(newTree);
};
