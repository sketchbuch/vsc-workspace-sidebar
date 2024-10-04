import { RenderVars } from '../../../webviews/webviews.interface'
import {
  FileTree,
  FindFileResult,
  WorkspaceState,
} from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { isFile } from '../../helpers/isFile'
import { sortTreeChildren, TreeChildren } from '../../helpers/sortTreeChildren'
import { itemFile } from './itemFile'
import { itemFolder } from './itemFolder'

export type TreeProps = {
  branch: FileTree
  closedFolders: string[]
  depth: number
  renderVars: RenderVars
  result: FindFileResult
  state: WorkspaceState
}

export const tree = ({
  branch,
  closedFolders,
  depth,
  renderVars,
  result,
  state,
}: TreeProps): string => {
  const { files, folderPathSegment, isRoot, sub } = branch
  const isClosed = !state.search.term && closedFolders.includes(folderPathSegment)

  let children: TreeChildren = []
  let fileDepth = depth
  let treeDepth = depth + 1

  if (!isClosed) {
    children = sortTreeChildren([...sub, ...files])

    if (!isRoot && children.length < 1) {
      return ''
    }
  }

  return `
    ${itemFolder({ folder: branch, depth, isClosed, state, result, renderVars })}
    ${children
      .map((child) => {
        if (isFile(child)) {
          return itemFile({ depth: fileDepth, file: child, renderVars, state })
        } else {
          return tree({ branch: child, depth: treeDepth, closedFolders, state, result, renderVars })
        }
      })
      .join('')}
  `
}
