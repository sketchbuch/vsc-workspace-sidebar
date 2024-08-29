import { isSelected } from '../../utils/fs/isSelected'
import { WorkspaceState } from '../../webviews/Workspace/WorkspaceViewProvider.interface'

export const isExternalWs = (state: WorkspaceState): boolean => {
  const { rootFolders, selected, wsType } = state

  if (wsType !== 'ws') {
    return false
  } else if (selected && wsType === 'ws') {
    for (let rf = 0; rf < rootFolders.length; rf++) {
      const rootFolder = rootFolders[rf]

      // Could be external, but the root folder is loading so assume not external until loading finishes
      if (selected.startsWith(rootFolder.folderPath) && rootFolder.result === 'loading') {
        return false
      }

      for (let cf = 0; cf < rootFolder.convertedFiles.length; cf++) {
        const { file } = rootFolder.convertedFiles[cf]

        if (isSelected(file, selected)) {
          return false
        }
      }
    }
  }

  return true
}
