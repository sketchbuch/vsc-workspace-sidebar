import { ConfigOptionType } from '../../configOptions'
import { WorkspaceViewProvider } from '../WorkspaceViewProvider'

export const updateByType = (
  type: ConfigOptionType,
  workspaceViewProvider: WorkspaceViewProvider,
  isTree: boolean
) => {
  switch (type) {
    case 'search':
      workspaceViewProvider.updateSearch()
      break

    case 'tree':
      if (isTree) {
        workspaceViewProvider.updateFileTree()
      }
      break

    case 'visible-files':
      workspaceViewProvider.updateVisibleFiles()
      break

    case 'rerender':
      workspaceViewProvider.rerender()
      break

    default:
      workspaceViewProvider.refetch()
      break
  }
}
