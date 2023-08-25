import { WorkspaceState } from '../WorkspaceViewProvider.interface'

export const invalid = (state: WorkspaceState): void => {
  state.files = []
  state.isFolderInvalid = true
  state.state = 'invalid'
}
