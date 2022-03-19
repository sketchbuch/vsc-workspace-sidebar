import { t } from 'vscode-ext-localisation';
import { list, searchForm } from '..';
import { getSearchMinConfig } from '../../../config/getConfig';
import { RenderVars } from '../../../webviews/webviews.interface';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { settingsLink } from '../../common/snippets/settingsLink';
import { folderList } from '../snippets/folderList';

export const listView = (state: WorkspaceState, renderVars: RenderVars): string => {
  if (state.files) {
    if (state.files.length > 0) {
      const searchMinimum = getSearchMinConfig();
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

    return `
      <section class="view list list--empty">
        <p class="view__message">
          <span class="view__message-title">
            <span class="view__message-icon codicon codicon-error"></span>
            ${t('webViews.workspace.list-empty')}
          </span>
          ${settingsLink()}
        </p>
      </section>
    `;
  }

  return '';
};
