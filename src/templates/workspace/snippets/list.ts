import { t } from 'vscode-ext-localisation';
import { listItem } from '..';
import { WorkspaceState } from '../../../webviews';
import { RenderVars } from '../../../webviews/webviews.interface';
import { FileTree, getFileTree } from '../../../webviews/Workspace/helpers/getFileTree';

const getTreeBranches = (tree: FileTree): string => {
  return Object.entries(tree)
    .map(([key, value]) => {
      if (value !== null) {
        return `
        <li>
          ${key}<br>
          <ul>
            ${getTreeBranches(value)}
          </ul>
        </li>
        `;
      }

      return `<li>${key}</li>`;
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
      <ul class="list__list list__styled-list">
        ${
          showTree
            ? getTreeBranches(getFileTree(convertedFiles))
            : visibleFiles.map((file) => listItem(file, renderVars)).join('')
        }
      </ul>
    `;
};
