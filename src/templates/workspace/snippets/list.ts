import { t } from 'vscode-ext-localisation';
import { listItem } from '..';
import { getShowTreeConfig } from '../../../config/getConfig';
import { WorkspaceState } from '../../../webviews';
import { RenderVars } from '../../../webviews/webviews.interface';
import { getFileTree } from '../../../webviews/Workspace/helpers/getFileTree';
import { tree } from './tree';

export const list = (state: WorkspaceState, renderVars: RenderVars) => {
  const { files, search, visibleFiles } = state;

  if (files === false) {
    return '';
  }

  if (visibleFiles.length < 1) {
    if (search) {
      return `
          <div class="list__searchedout">
            <p>${t('webViews.workspace.searchedOut')}</p>
          </div>
        `;
    }
  }

  const showTree = getShowTreeConfig();

  return `
      <ul class="list__list list__styled-list${showTree ? ' list__styled-list--tree' : ''}">
        ${
          showTree
            ? tree(getFileTree(visibleFiles), renderVars, state, 0)
            : visibleFiles.map((file) => listItem(file, renderVars)).join('')
        }
      </ul>
    `;
};
