import { RenderVars } from '../../../webviews/webviews.interface';
import { FileTree } from '../../../webviews/Workspace/helpers/getFileTree';
import { File } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { listItemButtons } from './listItemButtons';
import { listItemIcon } from './listItemIcon';
import { emptyArrow, treeArrow } from './treeIcons';

export const isFile = (branch: FileTree | File): branch is File => {
  return (branch as File).isSelected !== undefined;
};

export const treeIndent = (depth: number) => {
  if (depth === 0) {
    return '';
  }

  const indents = [...Array(depth).keys()]
    .map(() => {
      return `
        <div class="list_branch-indent"></div>
      `;
    })
    .join('')
    .trim();

  return `<div class="list_branch-indent-box">${indents}</div>`;
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
              ${treeArrow()}
              <span class="list__text">
                <span class="list__title">${key}</span>
              </span>
            </span>
          </li>
          ${tree(value, renderVars, depth + 1)}
        `;
      }

      const { isSelected, path } = value;
      const classes = `list__styled-item ${
        isSelected ? 'list__styled-item--selected' : 'list__styled-item--unselected'
      }`;

      return `
        <li class="list__branch-list-item ${classes}" data-depth="${depth}">
          ${isSelected ? listItemIcon(renderVars) : ''}
          ${treeIndent(depth)}
          <span class="list__element" title="${key}">
            ${emptyArrow()}
            <span class="list__text">
              <span class="list__title">${key}</span>
              ${path ? `<span class="list__description">${path}</span>` : ''}
            </span>
            ${valueIsFile && !isSelected ? listItemButtons(value, renderVars) : ''}
          </span>
        </li>
      `;
    })
    .join('');
};
