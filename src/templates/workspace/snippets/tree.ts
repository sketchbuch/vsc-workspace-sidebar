import { getFileTooltip } from '../../../utils/strings/getFileTooltip';
import { RenderVars } from '../../../webviews/webviews.interface';
import { FileTree } from '../../../webviews/Workspace/helpers/getFileTree';
import { File } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { listItemButtons } from './listItemButtons';
import { listItemIcon } from './listItemIcon';
import { treeIconArrow, treeIconFile } from './treeIcons';
import { treeIndent } from './treeIndent';

export const isFile = (branch: FileTree | File): branch is File => {
  return (branch as File).isSelected !== undefined;
};

export const tree = (branch: FileTree, renderVars: RenderVars, depth: number): string => {
  return Object.entries(branch)
    .map(([key, value]) => {
      const hasSubtree = Object.entries(value).length > 0;
      const valueIsFile = isFile(value);

      if (!valueIsFile && hasSubtree) {
        return `
          <li class="list__branch-list-item list__branch-list-item--sub list__styled-item" data-depth="${depth}">
            ${treeIndent(depth)}
            <span class="list__element" title="${key}">
              ${treeIconArrow()}
              <span class="list__text">
                <span class="list__title">${key}</span>
              </span>
            </span>
          </li>
          ${tree(value, renderVars, depth + 1)}
        `;
      }

      const { isSelected, label, path, showPath } = value;
      const classes = `list__styled-item ${
        isSelected ? 'list__styled-item--selected' : 'list__styled-item--unselected'
      }`;
      const tooltip = valueIsFile ? getFileTooltip(value, 'cur-win') : key;
      const itemLabel = valueIsFile ? label : key;

      return `
        <li class="list__branch-list-item ${classes}" data-depth="${depth}">
          ${isSelected ? listItemIcon(renderVars) : ''}
          ${treeIndent(depth)}
          <span class="list__element" title="${tooltip}">
            ${treeIconFile()}
            <span class="list__text">
              <span class="list__title">${itemLabel}</span>
              ${showPath ? `<span class="list__description">${path}</span>` : ''}
            </span>
            ${valueIsFile && !isSelected ? listItemButtons(value, renderVars) : ''}
          </span>
        </li>
      `;
    })
    .join('');
};
