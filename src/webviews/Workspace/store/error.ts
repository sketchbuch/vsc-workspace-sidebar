import { PayloadAction } from '@reduxjs/toolkit'
import { WorkspaceState, WorkspaceStateErrorObj } from '../WorkspaceViewProvider.interface'

export const error = (
  state: WorkspaceState,
  action: PayloadAction<WorkspaceStateErrorObj>
): void => {
  const errorObj: WorkspaceStateErrorObj = action.payload ?? null

  state.error = 'DEFAULT'
  state.errorObj = errorObj
  state.fileCount = 0
  state.result = 'ok'
  state.isFolderInvalid = false
  state.rootFolders = []
  state.view = 'error'
  state.visibleFileCount = 0
}
