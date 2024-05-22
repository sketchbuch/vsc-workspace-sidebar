import {
  FileTree,
  FindFileResult,
  WorkspaceState,
} from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { itemFolder } from './itemFolder'
import { rootFolderMessage } from './rootFolderMessage'

export type ListErrorProps = {
  depth: number
  folder: FileTree
  renderVars: RenderVars
  result: FindFileResult
  state: WorkspaceState
}

export const listError = ({ depth, folder, renderVars, result, state }: ListErrorProps): string => {
  return `
    ${itemFolder({
      depth: 0,
      folder,
      isClosed: false,
      isFolderError: true,
      renderVars,
      state,
    })}
    ${rootFolderMessage(result, depth)}
  `
}
