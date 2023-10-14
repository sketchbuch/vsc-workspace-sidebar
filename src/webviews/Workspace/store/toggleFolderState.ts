import { PayloadAction } from '@reduxjs/toolkit'
import {
  WorkspacePmPayloadToggleFolderState,
  WorkspaceState,
} from '../WorkspaceViewProvider.interface'

export const toggleFolderState = (
  state: WorkspaceState,
  action: PayloadAction<WorkspacePmPayloadToggleFolderState>
): void => {
  if (action.payload) {
    state.rootFolders = state.rootFolders.map((rootFolder) => {
      const newFolder = { ...rootFolder }
      const isClosed = rootFolder.closedFolders.includes(action.payload)

      if (isClosed) {
        newFolder.closedFolders = rootFolder.closedFolders.filter(
          (folder) => folder !== action.payload
        )
      } else if (!isClosed) {
        newFolder.closedFolders = [...rootFolder.closedFolders, action.payload]
      }

      return newFolder
    })
  }
}
