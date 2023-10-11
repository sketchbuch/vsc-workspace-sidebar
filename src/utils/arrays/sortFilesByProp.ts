import { File } from '../../webviews/Workspace/WorkspaceViewProvider.interface'

type SortFilesProps = 'cleanedLabel' | 'label' | 'path'

export const sortFilesByProp =
  (prop: SortFilesProps) =>
  (a: File, b: File): number => {
    if (prop === 'cleanedLabel' || prop === 'label' || prop === 'path') {
      if (a && b && a.hasOwnProperty(prop) && b.hasOwnProperty(prop)) {
        const aVal = String(a[prop]).toLowerCase()
        const bVal = String(b[prop]).toLowerCase()

        if (aVal > bVal) {
          return 1
        } else if (aVal < bVal) {
          return -1
        }
      }
    }

    return 0
  }
