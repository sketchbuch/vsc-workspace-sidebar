import { WorkspaceState } from '../WorkspaceViewProvider.interface'

export const loading = (state: WorkspaceState): void => {
  state.error = ''
  state.invalidReason = 'ok'
  state.isFolderInvalid = false
  state.rootFolders = []
  state.selected = ''
  state.state = 'loading'
}
