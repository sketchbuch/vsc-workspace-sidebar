import { t } from 'vscode-ext-localisation';
import { list, searchBox } from '..';
import { getImgUrls } from '../..';
import { RenderVars } from '../../../webviews/webviews.interface';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { settingsLink } from '../../common/snippets/settingsLink';

export const listView = (state: WorkspaceState, renderVars: RenderVars): string => {
  if (state.files) {
    if (state.files.length > 0) {
      return `
        <section class="view list">
          <form id="searchWorkspacesForm" role="search" class="list__search">
            ${searchBox(state)}
          </form>
          ${list(state, renderVars)}
        </section>
      `;
    }

    const { dark, light } = getImgUrls(renderVars, 'error');

    return `
      <section class="view list list--empty">
        <span class="view__icon list__icon">
          <img alt="" data-theme="dark" src="${dark}" />
          <img alt="" data-theme="light" src="${light}" />
        </span>
        <p class="view__message">
          <span class="view__message-title">${t('webViews.workspace.list-empty')}</span>
          ${settingsLink()}
        </p>
      </section>
    `;
  }

  return '';
};
