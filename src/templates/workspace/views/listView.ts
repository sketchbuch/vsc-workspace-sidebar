import { workspace } from 'vscode';
import { t } from 'vscode-ext-localisation';
import { list, searchForm } from '..';
import { getImgUrls } from '../..';
import { CONFIG_SEARCH_MINIMUM } from '../../../constants';
import { RenderVars } from '../../../webviews/webviews.interface';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { settingsLink } from '../../common/snippets/settingsLink';
import { folderList } from '../snippets/folderList';

export const listView = (state: WorkspaceState, renderVars: RenderVars): string => {
  if (state.files) {
    if (state.files.length > 0) {
      const searchMinimum: number =
        workspace.getConfiguration().get('workspaceSidebar.searchMinimum') ?? CONFIG_SEARCH_MINIMUM;
      const showSearch = searchMinimum === 0 || state.files.length >= searchMinimum;

      return `
        <section class="view list" data-showsearch=${showSearch} data-folderopen=${
        state.wsType === 'folder'
      }>
          ${folderList(state)}
          ${searchForm(state, showSearch)}
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
