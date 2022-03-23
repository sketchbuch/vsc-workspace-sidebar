import path from 'path';
import { RenderVars } from '../../../webviews/webviews.interface';
import { FileTree } from '../../../webviews/Workspace/helpers/getFileTree';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { listItemIcon } from './listItemIcon';
import { treeIconClosed, treeIconOpen } from './treeIcons';
import { treeIndent } from './treeIndent';

export const treeItemFolder = (
  folder: FileTree,
  depth: number,
  isClosed: boolean,
  renderVars: RenderVars,
  state: WorkspaceState
): string => {
  const { folderPath, isRoot, label } = folder;
  const indicateSelected = isClosed && state.selected.includes(`${folderPath}${path.sep}`);

  let folderClasses = `list__branch-list-item list__branch-list-item-folder list__styled-item`;

  if (indicateSelected) {
    folderClasses += ' list__styled-item--selected';
  }

  if (!isRoot) {
    folderClasses += ' list__branch-list-item-folder-closable';
  }

  return `
      <li class="${folderClasses}" data-folder="${folderPath}" data-depth="${depth}">
        ${indicateSelected ? listItemIcon(renderVars) : ''}
        ${treeIndent(depth)}
        <span class="list__element" title="${label}">
          ${isClosed ? treeIconClosed() : treeIconOpen()}
          <span class="list__text">
            <span class="list__title">${label}</span>
          </span>
        </span>
      </li>
    `;
};
