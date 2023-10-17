import { WorkspaceState } from '../WorkspaceViewProvider.interface'

export const loading = (state: WorkspaceState): void => {
  state.error = ''
  state.errorObj = null
  state.fileCount = 0
  state.invalidReason = 'none'
  state.isFolderInvalid = false
  state.rootFolders = []
  state.selected = ''
  state.view = 'loading'
  state.visibleFileCount = 0
}
