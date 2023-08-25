import { WorkspaceState } from '../WorkspaceViewProvider.interface'

export const loading = (state: WorkspaceState): void => {
  state.error = ''
  state.files = []
  state.invalidReason = 'none'
  state.isFolderInvalid = false
  state.selected = ''
  state.state = 'loading'
}
