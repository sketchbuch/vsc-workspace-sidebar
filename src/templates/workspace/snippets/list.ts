import { t } from 'vscode-ext-localisation';
import { getShowTreeConfig } from '../../../config/getConfig';
import { RenderVars } from '../../../webviews/webviews.interface';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { listItem } from './listItem';
import { tree } from './tree';

export const list = (state: WorkspaceState, renderVars: RenderVars) => {
  const { files, search, visibleFiles } = state;

  if (files.length === 0) {
    return '';
  } else if (visibleFiles.length === 0 && search) {
    return `
      <div class="list__searchedout">
        <p>${t('webViews.workspace.searchedOut')}</p>
      </div>
    `;
  }

  const showTree = getShowTreeConfig();

  return `
      <ul class="list__list list__styled-list${
        showTree && state.fileTree !== null ? ' list__styled-list--tree' : ''
      }">
        ${
          showTree && state.fileTree !== null
            ? tree(state.fileTree, 0, renderVars, state)
            : visibleFiles.map((file) => listItem(file, renderVars)).join('')
        }
      </ul>
    `;
};
