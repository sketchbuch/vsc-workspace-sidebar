import { t } from 'vscode-ext-localisation';
import { listItem } from '..';
import { WorkspaceState } from '../../../webviews';
import { RenderVars } from '../../../webviews/webviews.interface';

export const list = (state: WorkspaceState, renderVars: RenderVars) => {
  const { search, visibleFiles } = state;

  if (visibleFiles.length < 1 && search) {
    return `
        <div class="list__list-searchedout">
          <p>${t('webViews.workspace.searchedOut')}</p>
        </div>
      `;
  }

  return `
      <ul class="list__list">
        ${visibleFiles.map((file) => listItem(file, renderVars)).join('')}
      </ul>
    `;
};
