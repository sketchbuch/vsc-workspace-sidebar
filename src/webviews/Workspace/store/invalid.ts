import { WorkspaceState } from '../WorkspaceViewProvider.interface'

export const invalid = (state: WorkspaceState): void => {
  console.log('### invalid')
  state.fileCount = 0
  state.rootFolders = []
  state.view = 'invalid'
  state.visibleFileCount = 0
  state.workspaceData = []
}
