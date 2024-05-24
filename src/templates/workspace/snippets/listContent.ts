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
import { ItemFolderProps, itemFolder } from './itemFolder'
import { rootFolderMessage } from './rootFolderMessage'
import { tree } from './tree'

export type ListContentProps = {
  branch: FileTree | null
  closedFolders: string[]
  depth: number
  folder: FileTree
  isClosed: boolean
  isRootPathError: boolean
  renderVars: RenderVars
  result: FindFileResult
  state: WorkspaceState
  visibleFiles: Files
}

export const listContent = ({
  branch,
  closedFolders,
  depth,
  folder,
  isClosed,
  isRootPathError,
  renderVars,
  result,
  state,
  visibleFiles,
}: ListContentProps): string => {
  const folderProps: ItemFolderProps = {
    depth: 0,
    folder,
    isClosed,
    renderVars,
    state,
  }

  if (isRootPathError) {
    return `
      ${itemFolder({
        ...folderProps,
        isClosed: false,
        isFolderError: true,
      })}
      ${rootFolderMessage(result, depth)}
    `
  } else if (result === 'loading') {
    return `
      ${itemFolder(folderProps)}
      ${viewMsg({
        message: t('workspace.loading.title'),
        iconType: 'loading',
        type: 'title',
      })}
    `
  } else if (branch) {
    return tree({
      branch,
      closedFolders,
      depth: 0,
      renderVars,
      state,
    })
  }

  return `
    ${itemFolder(folderProps)}
    ${!isClosed ? visibleFiles.map((file) => itemFile({ file, state, renderVars })).join('') : ''}
  `
}
