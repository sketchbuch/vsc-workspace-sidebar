import { PayloadAction } from '@reduxjs/toolkit'
import { WorkspaceState, WorkspaceStateRootFolder } from '../WorkspaceViewProvider.interface'

export const setRootFolders = (
  state: WorkspaceState,
  action: PayloadAction<WorkspaceStateRootFolder[]>
): void => {
  state.rootFolders = action.payload
}
