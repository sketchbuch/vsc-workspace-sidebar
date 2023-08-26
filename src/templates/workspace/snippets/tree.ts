import { RenderVars } from '../../../webviews/webviews.interface'
import { FileTree } from '../../../webviews/Workspace/helpers/getFileTree'
import { File, WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { sortTreeChildren, TreeChildren } from '../../helpers/sortTreeChildren'
import { treeItemFile } from './treeItemFile'
import { treeItemFolder } from './treeItemFolder'

const isFile = (item: File | FileTree): item is File => {
  return (item as File).file !== undefined
}

export const tree = (
  branch: FileTree,
  depth: number,
  state: WorkspaceState,
  renderVars: RenderVars
): string => {
  const { showRootFolder } = renderVars
  const { files, folderPathSegment, isRoot, sub } = branch
  const isClosed = state.closedFolders.includes(folderPathSegment)
  let children: TreeChildren = []
  let fileDepth = depth
  let treeDepth = depth + 1
  let showItemFolder = true

  // If this is the root level, and show root folder is false,
  // ignore the root folder and just show the subfolders/subworkspaces
  if (isRoot) {
    if (!showRootFolder) {
      children = sortTreeChildren([...sub, ...files])
      fileDepth = -1
      treeDepth = depth
      showItemFolder = false
    }
  }

  if (showItemFolder && !isClosed) {
    children = sortTreeChildren([...sub, ...files])
  }

  return `
    ${showItemFolder ? treeItemFolder(branch, depth, isClosed, state, renderVars) : ''}
    ${
      children.length > 0
        ? children
            .map((child) => {
              if (isFile(child)) {
                return treeItemFile(child, fileDepth, state, renderVars)
              } else {
                return tree(child, treeDepth, state, renderVars)
              }
            })
            .join('')
        : ''
    }
  `
}
