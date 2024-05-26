import { WorkspaceState } from '../WorkspaceViewProvider.interface'

export const invalid = (state: WorkspaceState): void => {
  state.fileCount = 0
  state.rootFolders = []
  state.view = 'invalid'
  state.visibleFileCount = 0
  state.workspaceData = []
}
