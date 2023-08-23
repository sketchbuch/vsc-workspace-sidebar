import { t } from 'vscode-ext-localisation';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { searchBox } from './searchBox';

export const searchForm = (state: WorkspaceState, showSearch: boolean): string => {
  if (showSearch) {
    return `
      <section role="search" class="list__search">
        ${searchBox(state)}
        <fieldset>
          <legend class="a11y__screenreader-text">${t(
            'workspace.list.search.optionsLegend'
          )}</legend>
          <ul class="list__search-optionlist">
            <li>
              <vscode-checkbox class="list__search-checkbox" value="matchStart" checked="${
                state.search.matchStart
              }">${t('workspace.list.search.options.matchStart')}</vscode-checkbox>
            </li>
            <li>
              <vscode-checkbox class="list__search-checkbox" value="caseInsensitive" checked="${
                state.search.caseInsensitive
              }">${t('workspace.list.search.options.caseInsensitive')}</vscode-checkbox>
            </li>
          </ul>
        </fieldset>
        <vscode-divider role="separator"></vscode-divider>
      </section>
    `;
  }

  return '';
};
