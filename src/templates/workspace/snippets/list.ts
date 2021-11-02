import { t } from 'vscode-ext-localisation';
import { listItem } from '..';
import { WorkspaceState } from '../../../webviews';
import { RenderVars } from '../../../webviews/webviews.interface';
import { FileTree, getFileTree } from '../../../webviews/Workspace/helpers/getFileTree';
import { File } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const isFile = (branch: FileTree | File): branch is File => {
  return (branch as File).isSelected !== undefined;
};

const treeBranches = (tree: FileTree, renderVars: RenderVars): string => {
  return Object.entries(tree)
    .map(([key, value]) => {
      if (isFile(value)) {
        return listItem(value, renderVars);
      }

      return `
        <li>
          ${key}<br>
          <ul>
            ${treeBranches(value, renderVars)}
          </ul>
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
      <ul class="list__list list__styled-list">
        ${
          showTree
            ? treeBranches(getFileTree(convertedFiles), renderVars)
            : visibleFiles.map((file) => listItem(file, renderVars)).join('')
        }
      </ul>
    `;
};
