import { WorkspaceState } from '../WorkspaceViewProvider.interface'

export const invalid = (state: WorkspaceState): void => {
  state.isFolderInvalid = true
  state.rootFolders = []
  state.state = 'invalid'
}
