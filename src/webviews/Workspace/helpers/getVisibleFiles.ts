import { SortIds } from '../../../commands/registerCommands'
import { getCleanLabelsConfig } from '../../../config/general'
import { getShowPathsConfig } from '../../../config/listview'
import { getShowTreeConfig } from '../../../config/treeview'
import { ConfigShowPaths } from '../../../constants/config'
import { sortFilesByProp } from '../../../utils/arrays/sortFilesByProp'
import { File, Files, SearchState } from '../WorkspaceViewProvider.interface'
import { findDuplicates } from './findDuplicates'

export const getVisibleFiles = (wsFiles: Files, search: SearchState, sort: SortIds) => {
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

    if (sort === 'descending') {
      visibleFiles.reverse()
    }
  }

  if (showPaths === ConfigShowPaths.AS_NEEEDED) {
    const labels = visibleFiles.map((file) => file.label)
    const dups = findDuplicates(labels)

    visibleFiles = visibleFiles.map((file: File) => {
      if (!dups.includes(file.label)) {
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
