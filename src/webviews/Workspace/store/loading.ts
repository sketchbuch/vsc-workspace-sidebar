import { WorkspaceState } from '../WorkspaceViewProvider.interface'

export const loading = (state: WorkspaceState): void => {
  state.error = ''
  state.fileCount = 0
  state.invalidReason = 'ok'
  state.isFolderInvalid = false
  state.rootFolders = []
  state.selected = ''
  state.view = 'loading'
  state.visibleFileCount = 0
}
