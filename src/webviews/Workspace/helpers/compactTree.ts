import * as path from 'path'
import { CONFIG_DEPTH_MAX } from '../../../constants/config'
import { CompactedFolder, FileTree, FileTrees } from '../WorkspaceViewProvider.interface'
import { getCompactedFolder } from './getCompactedFolder'
import { isCompactable } from './isCompactable'

/**
 * This will compact folders in a similar way to the "Explorer: Compact Folders" setting.
 * Single child folders will be compressed in a combined tree element. Useful for Java package structures, for example.
 *
 * i.e.:
 *
 * - Test
 *  - Subfolder
 *    # File 1
 *
 * Would be displayed as
 *
 * - Test / Subfolder
 *   # File 1
 */
export const compactTree = (tree: FileTree): FileTree => {
  if (tree.sub.length > 0) {
    tree.sub = tree.sub.reduce((newSubs: FileTrees, curSub: FileTree) => {
      if (isCompactable(curSub)) {
        let depth = 0
        let nextFolder = curSub.sub[0]
        const labels: string[] = [curSub.label]
        const compactedFolders: CompactedFolder[] = [getCompactedFolder(curSub)]

        compactedFolders.push(getCompactedFolder(nextFolder))

        while (isCompactable(nextFolder) && depth < CONFIG_DEPTH_MAX) {
          depth += 1
          labels.push(nextFolder.label)
          nextFolder = nextFolder.sub[0]
          compactedFolders.push(getCompactedFolder(nextFolder))
        }

        newSubs.push(
          compactTree({
            ...nextFolder,
            compactedFolders,
            label: path.join(...labels, nextFolder.label),
          })
        )
      } else {
        newSubs.push(compactTree(curSub))
      }

      return newSubs
    }, [])
  }

  return tree
}
