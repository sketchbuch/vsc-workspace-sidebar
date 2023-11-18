import { WorkspaceState } from '../WorkspaceViewProvider.interface'

export const loading = (state: WorkspaceState): void => {
  state.error = ''
  state.errorObj = null
  state.fileCount = 0
  state.result = 'ok'
  state.isFolderInvalid = false
  state.rootFolders = []
  state.selected = ''
  state.view = 'loading'
  state.visibleFileCount = 0
}
