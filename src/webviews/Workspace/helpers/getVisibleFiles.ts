import * as pathLib from 'path'
import { getCleanLabelsConfig } from '../../../config/general'
import { getShowPathsConfig } from '../../../config/listview'
import { getShowTreeConfig } from '../../../config/treeview'
import { ConfigShowPaths } from '../../../constants/config'
import { sortFilesByProp } from '../../../utils/arrays/sortFilesByProp'
import { File, Files, SearchState } from '../WorkspaceViewProvider.interface'
import { findDuplicates } from './findDuplicates'

export const getVisibleFiles = (wsFiles: Files, search: SearchState) => {
  const showTree = getShowTreeConfig()
  const showPaths = getShowPathsConfig()
  const cleanLabels = getCleanLabelsConfig()

  const { caseInsensitive, matchStart, term } = search
  let visibleFiles = [...wsFiles]

  if (term) {
    visibleFiles = visibleFiles.filter((file) => {
      const visibleLabel = cleanLabels ? file.cleanedLabel : file.label
      const label = caseInsensitive ? visibleLabel.toLowerCase() : visibleLabel
      const searchTerm = caseInsensitive ? term.toLowerCase() : term

      return matchStart ? label.startsWith(searchTerm) : label.includes(searchTerm)
    })
  }

  if (!showTree) {
    visibleFiles.sort(sortFilesByProp(cleanLabels ? 'cleanedLabel' : 'label'))
  }

  if (showPaths === ConfigShowPaths.AS_NEEEDED) {
    const checks = visibleFiles.map(({ label, path }) => {
      const pathParts = path.split(pathLib.sep)

      return showTree && pathParts.length > 1 ? `${label}-${pathParts[0]}` : label
    })
    const dups = findDuplicates(checks)

    visibleFiles = visibleFiles.map((file: File, index: number) => {
      if (!dups.includes(checks[index])) {
        return { ...file, showPath: false }
      }

      return file
    })
  } else if (showPaths === ConfigShowPaths.NEVER) {
    visibleFiles = visibleFiles.map((file): File => {
      return { ...file, showPath: false }
    })
  }

  return visibleFiles
}
