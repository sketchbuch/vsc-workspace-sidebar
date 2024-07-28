import { WorkspaceState } from '../WorkspaceViewProvider.interface'

export const loading = (state: WorkspaceState): void => {
  state.error = ''
  state.errorObj = null
  state.result = 'ok'
  state.rootFolders = []
  state.selected = ''
  state.view = 'loading'
}
