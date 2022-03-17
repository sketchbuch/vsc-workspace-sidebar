import { t } from 'vscode-ext-localisation';
import { listItem } from '..';
import { WorkspaceState } from '../../../webviews';
import { RenderVars } from '../../../webviews/webviews.interface';
import { getFileTree } from '../../../webviews/Workspace/helpers/getFileTree';
import { tree } from './tree';

export const list = (state: WorkspaceState, renderVars: RenderVars) => {
  const { convertedFiles, files, search, visibleFiles } = state;

  if (files === false) {
    return '';
  }

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

  const showTree = true;

  return `
      <ul class="list__list list__styled-list${showTree ? ' list__styled-list--tree' : ''}">
        ${
          showTree
            ? tree(getFileTree(convertedFiles), renderVars, 0)
            : visibleFiles.map((file) => listItem(file, renderVars)).join('')
        }
      </ul>
    `;
};
