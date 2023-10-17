import { PayloadAction } from '@reduxjs/toolkit'
import { WorkspaceState, WorkspaceStateErrorObj } from '../WorkspaceViewProvider.interface'

export const error = (
  state: WorkspaceState,
  action: PayloadAction<WorkspaceStateErrorObj>
): void => {
  state.error = 'DEFAULT'
  state.errorObj = action.payload
  state.fileCount = 0
  state.invalidReason = 'none'
  state.isFolderInvalid = false
  state.rootFolders = []
  state.view = 'error'
  state.visibleFileCount = 0
}
