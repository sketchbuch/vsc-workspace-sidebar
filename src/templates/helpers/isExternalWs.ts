import { isSelected } from '../../utils/fs/isSelected'
import { WorkspaceState } from '../../webviews/Workspace/WorkspaceViewProvider.interface'

export const isExternalWs = (state: WorkspaceState): boolean => {
  const { rootFolders, selected, wsType } = state

  return true

  console.log('### isExternalWs()')
  console.log('###  - wsType', wsType)
  console.log('###  - selected', state.selected)

  if (wsType !== 'ws') {
    return false
  } else if (selected && wsType === 'ws') {
    for (let rf = 0; rf < rootFolders.length; rf++) {
      const rootFolder = rootFolders[rf]

      for (let cf = 0; cf < rootFolder.convertedFiles.length; cf++) {
        const { file } = rootFolder.convertedFiles[cf]

        console.log('###  - file', file)

        if (isSelected(file, selected)) {
          return false
        }
      }
    }
  }

  console.log('### =========')

  return true
}
