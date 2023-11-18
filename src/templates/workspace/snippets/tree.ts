import { RenderVars } from '../../../webviews/webviews.interface'
import { FileTree } from '../../../webviews/Workspace/helpers/getFileTree'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { isFile } from '../../helpers/isFile'
import { sortTreeChildren, TreeChildren } from '../../helpers/sortTreeChildren'
import { itemFile } from './itemFile'
import { itemFolder } from './itemFolder'

export const tree = (
  branch: FileTree,
  depth: number,
  closedFolders: string[],
  state: WorkspaceState,
  renderVars: RenderVars
): string => {
  const { files, folderPathSegment, sub } = branch
  const isClosed = closedFolders.includes(folderPathSegment)

  let children: TreeChildren = []
  let fileDepth = depth
  let showItemFolder = true
  let treeDepth = depth + 1

  if (showItemFolder && !isClosed) {
    children = sortTreeChildren([...sub, ...files])
  }

  return `
    ${showItemFolder ? itemFolder(branch, depth, isClosed, state, renderVars) : ''}
    ${
      children.length > 0
        ? children
            .map((child) => {
              if (isFile(child)) {
                return itemFile({ depth: fileDepth, file: child, renderVars, state })
              } else {
                return tree(child, treeDepth, closedFolders, state, renderVars)
              }
            })
            .join('')
        : ''
    }
  `
}
