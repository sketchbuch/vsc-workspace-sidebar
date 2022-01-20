import { RenderVars } from '../../../webviews/webviews.interface';
import { FileTree } from '../../../webviews/Workspace/helpers/getFileTree';
import { File } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { treeArrow, emptyArrow } from './treeIcons';

export const isFile = (branch: FileTree | File): branch is File => {
  return (branch as File).isSelected !== undefined;
};

export const treeIndent = (depth: number) => {
  if (depth === 0) {
    return '';
  }

  const indents = [...Array(depth).keys()]
    .map((count) => {
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

      if (!isFile(value) && hasSubtree) {
        return `
          <li class="list__branch-list-item list__styled-item" data-depth="${depth}">
            ${treeIndent(depth)}
            <span class="list__element" title="${key}">
              ${treeArrow()}
              <span class="list__title">${key}</span>
            </span>
          </li>
          ${tree(value, renderVars, depth + 1)}
        `;
      }

      return `
        <li class="list__branch-list-item list__styled-item" data-depth="${depth}">
          ${treeIndent(depth)}
          <span class="list__element" title="${key}">
          ${emptyArrow()}
            <span class="list__title">${key}</span>
          </span>
        </li>
      `;
    })
    .join('');
};
