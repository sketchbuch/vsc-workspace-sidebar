import { PayloadAction } from '@reduxjs/toolkit'
import { PayloadToggleFolderStateBulk, WorkspaceState } from '../WorkspaceViewProvider.interface'

export const toggleFolderStateBulk = (
  state: WorkspaceState,
  action: PayloadAction<PayloadToggleFolderStateBulk>
): void => {
  if (state.visibleFileCount < 1) {
    return
  }

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
}
