import { t } from 'vscode-ext-localisation';
import { listItem } from '..';
import { WorkspaceState } from '../../../webviews';
import { RenderVars } from '../../../webviews/webviews.interface';

export const list = (state: WorkspaceState, renderVars: RenderVars) => {
  const { files, search, visibleFiles } = state;

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

  return `
      <ul class="list__list">
        ${visibleFiles.map((file) => listItem(file, renderVars)).join('')}
      </ul>
    `;
};
