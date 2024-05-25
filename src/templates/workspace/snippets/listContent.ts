import {
  WorkspaceState,
  WorkspaceStateRootFolder,
} from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { itemFile } from './itemFile'
import { ItemFolderProps, itemFolder } from './itemFolder'
import { rootFolderMessage } from './rootFolderMessage'
import { tree } from './tree'

export type ListContentProps = {
  isClosed: boolean
  isRootPathError: boolean
  renderVars: RenderVars
  rootFolder: WorkspaceStateRootFolder
  state: WorkspaceState
}

export const listContent = ({
  isClosed,
  isRootPathError,
  renderVars,
  rootFolder,
  state,
}: ListContentProps): string => {
  const { closedFolders, depth, fileTree, folderName, folderPath, result, visibleFiles } =
    rootFolder

  const folderProps: ItemFolderProps = {
    depth: 0,
    folder: {
      compactedFolders: [],
      files: [],
      folderPath,
      folderPathSegment: folderName,
      isRoot: true,
      label: folderName,
      sub: [],
    },
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
      ${rootFolderMessage(result, depth)}
    `
  } else if (fileTree) {
    return tree({
      branch: fileTree,
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
