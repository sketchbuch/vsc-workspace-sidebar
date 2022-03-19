import { RenderVars } from '../../../webviews/webviews.interface';
import { getFileTooltip } from '../../../webviews/Workspace/helpers/getFileTooltip';
import { File } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { listItemButtons } from './listItemButtons';
import { listItemIcon } from './listItemIcon';
import { treeIconFile } from './treeIcons';
import { treeIndent } from './treeIndent';

export const treeItemFile = (file: File, depth: number, renderVars: RenderVars): string => {
  const { isSelected, label, path, showPath } = file;
  const classes = `list__branch-list-item list__branch-list-item-file list__styled-item ${
    isSelected ? 'list__styled-item--selected' : 'list__styled-item--unselected'
  }`;
  const tooltip = getFileTooltip(file, 'cur-win');

  return `
    <li class="${classes}" data-file="${file}" data-depth="${depth}">
      ${isSelected ? listItemIcon(renderVars) : ''}
      ${treeIndent(depth + 1)}
      <span class="list__element" title="${tooltip}">
        ${treeIconFile()}
        <span class="list__text">
          <span class="list__title">${label}</span>
          ${showPath ? `<span class="list__description">${path}</span>` : ''}
        </span>
        ${!isSelected ? listItemButtons(file, renderVars) : ''}
      </span>
    </li>
  `;
};
