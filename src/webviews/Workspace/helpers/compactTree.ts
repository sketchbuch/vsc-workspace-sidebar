import * as path from 'path'
import { FileTree, FileTrees } from '../WorkspaceViewProvider.interface'
import { isTreeFolderCompacted } from './isTreeFolderCompacted'

/**
 * This will compact folders in a similar way to the "Explorer: Compact Folders" setting.
 * Single child folders will be compressed in a combined tree element. Useful for Java package structures, for example.
 *
 * i.e.:
 *
 * -Test
 *  - Subfolder
 *    - File 1
 *
 * Wuld be displayed as
 *
 * -Test / Subfolder
 *  - File 1
 */
export const compactTree = (tree: FileTree): FileTree => {
  if (tree.sub.length > 0) {
    tree.sub = tree.sub.reduce((newSubs: FileTrees, curSub: FileTree) => {
      if (curSub.sub.length === 1 && curSub.files.length === 0) {
        const nextLabel = path.join(curSub.label, curSub.sub[0].label)

        newSubs.push(
          compactTree({
            ...curSub.sub[0],
            label: nextLabel,
          })
        )
      } else if (
        curSub.sub.length === 0 &&
        curSub.files.length > 0 &&
        isTreeFolderCompacted(tree)
      ) {
        const nextLabel = path.join(tree.label, curSub.label)
        tree = {
          ...tree,
          label: nextLabel,
          sub: [],
          files: [...curSub.files],
        }
      } else {
        newSubs.push(compactTree(curSub))
      }

      return newSubs
    }, [])
  }

  return tree
}
