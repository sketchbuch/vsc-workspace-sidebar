import { t } from 'vscode-ext-localisation';
import { listItem } from '..';
import { WorkspaceState } from '../../../webviews';
import { RenderVars } from '../../../webviews/webviews.interface';
import { FileTree, getFileTree } from '../../../webviews/Workspace/helpers/getFileTree';
import { File } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const isFile = (branch: FileTree | File): branch is File => {
  return (branch as File).isSelected !== undefined;
};

const renderTree = (branch: FileTree, renderVars: RenderVars): string => {
  return Object.entries(branch)
    .map(([key, value]) => {
      if (isFile(value)) {
        return listItem(value, renderVars);
      }

      return `
        <li class="list__branch-list-item list__styled-item">
          <span class="list__element" title="${key}">
            <span class="list__title">${key}</span>
            <ul>
              ${renderTree(value, renderVars)}
            </ul>
          </span>
        </li>
      `;
    })
    .join('');
};

export const list = (state: WorkspaceState, renderVars: RenderVars) => {
  const { convertedFiles, files, search, visibleFiles } = state;

  if (files === false) {
    return '';
  }

  const showTree = true;

  if (visibleFiles.length < 1) {
    if (search) {
      return `
          <div class="list__list-searchedout">
            <p>${t('webViews.workspace.searchedOut')}</p>
          </div>
        `;
    } else {
      return '';
    }
  }

  return `
      <ul class="list__list list__styled-list${showTree ? ' list__styled-list--tree' : ''}">
        ${
          showTree
            ? renderTree(getFileTree(convertedFiles), renderVars)
            : visibleFiles.map((file) => listItem(file, renderVars)).join('')
        }
      </ul>
    `;
};
