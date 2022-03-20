import { sortFilesByProp } from '../../../utils/arrays/sortFilesByProp';
import { RenderVars } from '../../../webviews/webviews.interface';
import { FileTree } from '../../../webviews/Workspace/helpers/getFileTree';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { treeItemFile } from './treeItemFile';
import { treeItemFolder } from './treeItemFolder';

export const tree = (
  branch: FileTree,
  renderVars: RenderVars,
  state: WorkspaceState,
  depth: number
): string => {
  return Object.entries(branch)
    .map(([key, value]) => {
      const { files, folderPath, sub } = value;
      const hasSubtree = Object.keys(sub).length > 0;
      const hasFiles = files.length > 0;
      const isClosed = state.closedFolders.includes(folderPath);

      if (hasSubtree || hasFiles) {
        return `
            ${treeItemFolder(value, key, depth, renderVars, state)}
            ${hasSubtree && !isClosed ? tree(sub, renderVars, state, depth + 1) : ''}
            ${
              hasFiles && !isClosed
                ? [...files]
                    .sort(sortFilesByProp('label'))
                    .map((file) => treeItemFile(file, depth, renderVars))
                    .join('')
                : ''
            }
          `;
      }

      return ``;
    })
    .join('');
};
