import { RenderVars } from '../../../webviews/webviews.interface';
import { FileTree } from '../../../webviews/Workspace/helpers/getFileTree';
import { File, WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { sortTreeChildren, TreeChildren } from '../../helpers/sortTreeChildren';
import { treeItemFile } from './treeItemFile';
import { treeItemFolder } from './treeItemFolder';

const isFile = (item: File | FileTree): item is File => {
  return (item as File).file !== undefined;
};

export const tree = (
  branch: FileTree,
  depth: number,
  renderVars: RenderVars,
  state: WorkspaceState
): string => {
  const { files, folderPath, isRoot, sub } = branch;

  // If this is the root level, and there are no workspaces in the folder,
  // ignore the default folder and just show the subfolders
  if (isRoot && files.length < 1 && sub.length > 0) {
    return sub
      .map((child) => {
        return tree(child, depth, renderVars, state);
      })
      .join('');
  }

  const isClosed = state.closedFolders.includes(folderPath);
  let children: TreeChildren = [];

  if (!isClosed) {
    children = sortTreeChildren([...sub, ...files]);
  }

  return `
    ${treeItemFolder(branch, depth, isClosed, renderVars, state)}
    ${
      children.length > 0
        ? children
            .map((child) => {
              if (isFile(child)) {
                return treeItemFile(child, depth, renderVars);
              } else {
                return tree(child, depth + 1, renderVars, state);
              }
            })
            .join('')
        : ''
    }
  `;
};
