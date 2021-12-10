import { listItem } from '..';
import { RenderVars } from '../../../webviews/webviews.interface';
import { FileTree } from '../../../webviews/Workspace/helpers/getFileTree';
import { File } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { treeArrow } from './treeArrow';

export const isFile = (branch: FileTree | File): branch is File => {
  return (branch as File).isSelected !== undefined;
};

export const tree = (branch: FileTree, renderVars: RenderVars): string => {
  return Object.entries(branch)
    .map(([key, value]) => {
      if (isFile(value)) {
        return listItem(value, renderVars);
      }

      const hasSubtree = Object.entries(value).length > 0;

      if (hasSubtree) {
        return `
          <li class="list__branch-list-item list__styled-item">
            <span class="list__element" title="${key}">
              ${treeArrow()}
              <span class="list__title">${key}</span>
              <ul>
                ${tree(value, renderVars)}
              </ul>
            </span>
          </li>
        `;
      }

      return `
        <li class="list__branch-list-item list__styled-item">
          <span class="list__element" title="${key}">
            <span class="list__title">${key}</span>
          </span>
        </li>
      `;
    })
    .join('');
};
