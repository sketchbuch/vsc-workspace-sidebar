import { WorkspaceState } from '../WorkspaceViewProvider.interface'

export const loading = (state: WorkspaceState): void => {
  console.log('### loading')
  state.error = ''
  state.errorObj = null
  state.fileCount = 0
  state.result = 'ok'
  state.rootFolders = []
  state.selected = ''
  state.view = 'loading'
  state.visibleFileCount = 0
  state.workspaceData = new Map()
}
