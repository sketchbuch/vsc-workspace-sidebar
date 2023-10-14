import { PayloadAction } from '@reduxjs/toolkit'
import { WorkspaceErrors, WorkspaceState } from '../WorkspaceViewProvider.interface'

export const error = (state: WorkspaceState, action: PayloadAction<WorkspaceErrors>): void => {
  state.error = action.payload
  state.fileCount = 0
  state.invalidReason = 'ok'
  state.isFolderInvalid = false
  state.rootFolders = []
  state.state = 'error'
  state.visibleFileCount = 0
}
