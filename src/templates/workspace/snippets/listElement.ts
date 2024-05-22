import { t } from 'vscode-ext-localisation'
import {
  FileTree,
  Files,
  FindFileResult,
  WorkspaceState,
} from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { viewMsg } from '../../common/snippets/viewMsg'
import { itemFile } from './itemFile'
import { itemFolder } from './itemFolder'

export type ListElementProps = {
  folder: FileTree
  isClosed: boolean
  renderVars: RenderVars
  result: FindFileResult
  state: WorkspaceState
  visibleFiles: Files
}

export const listElement = ({
  folder,
  isClosed,
  renderVars,
  result,
  state,
  visibleFiles,
}: ListElementProps): string => {
  if (result === 'loading') {
    return `
      ${itemFolder({
        depth: 0,
        folder,
        isClosed,
        renderVars,
        state,
      })}
      ${viewMsg({
        message: t('workspace.loading.title'),
        iconType: 'loading',
        type: 'title',
      })}
    `
  }

  return `
    ${itemFolder({
      depth: 0,
      folder,
      isClosed,
      renderVars,
      state,
    })}
    ${!isClosed ? visibleFiles.map((file) => itemFile({ file, state, renderVars })).join('') : ''}
  `
}
