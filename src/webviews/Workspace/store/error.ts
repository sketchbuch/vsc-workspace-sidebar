import { PayloadAction } from '@reduxjs/toolkit'
import { WorkspaceState, WorkspaceStateErrorObj } from '../WorkspaceViewProvider.interface'

export const error = (
  state: WorkspaceState,
  action: PayloadAction<WorkspaceStateErrorObj>
): void => {
  console.log('### error')
  const errorObj: WorkspaceStateErrorObj = action.payload ?? null

  state.error = 'DEFAULT'
  state.errorObj = errorObj
  state.fileCount = 0
  state.result = 'ok'
  state.rootFolders = []
  state.view = 'error'
  state.visibleFileCount = 0
  state.workspaceData = []
}
