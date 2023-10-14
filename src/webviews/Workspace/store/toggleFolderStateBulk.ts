import { PayloadAction } from '@reduxjs/toolkit'
import { WorkspaceState, WorkspaceToggleFolderStateBulk } from '../WorkspaceViewProvider.interface'

export const toggleFolderStateBulk = (
  state: WorkspaceState,
  action: PayloadAction<WorkspaceToggleFolderStateBulk>
): void => {
  state.rootFolders = state.rootFolders.map((rootFolder) => {
    const newFolder = { ...rootFolder }

    if (action.payload === 'expand' && rootFolder.closedFolders.length) {
      newFolder.closedFolders = []
    } else if (
      action.payload === 'collapse' &&
      rootFolder.visibleFiles.length &&
      rootFolder.treeFolders.length > 0
    ) {
      if (rootFolder.closedFolders.length !== rootFolder.treeFolders.length) {
        newFolder.closedFolders = [...rootFolder.treeFolders]
      }
    }

    return newFolder
  })

  console.log('### state.rootFolders', state.rootFolders)
}
