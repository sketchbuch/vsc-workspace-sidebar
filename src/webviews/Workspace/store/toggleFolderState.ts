import { PayloadAction } from '@reduxjs/toolkit'
import { PayloadToggleFolderState, WorkspaceState } from '../WorkspaceViewProvider.interface'

export const toggleFolderState = (
  state: WorkspaceState,
  action: PayloadAction<PayloadToggleFolderState>
): void => {
  if (action.payload) {
    const { folder, folderPath } = action.payload

    state.rootFolders = state.rootFolders.map((rootFolder) => {
      const newFolder = { ...rootFolder }

      if (folderPath.startsWith(rootFolder.folderPath)) {
        const isClosed = rootFolder.closedFolders.includes(folder)

        if (isClosed) {
          newFolder.closedFolders = rootFolder.closedFolders.filter(
            (closedFolder) => closedFolder !== folder
          )
        } else if (!isClosed) {
          newFolder.closedFolders = [...rootFolder.closedFolders, folder]
        }
      }

      return newFolder
    })
  }
}
