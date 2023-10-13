import { PayloadAction } from '@reduxjs/toolkit'
import { WorkspaceSort, WorkspaceState } from '../WorkspaceViewProvider.interface'

export const setSort = (state: WorkspaceState, action: PayloadAction<WorkspaceSort>): void => {
  state.sort = action.payload.sort
  state.visibleFiles.reverse()

  state.rootFolders = state.rootFolders.map((rootFolder) => {
    return {
      ...rootFolder,
      visibleFiles: rootFolder.visibleFiles.reverse(),
    }
  })
}
