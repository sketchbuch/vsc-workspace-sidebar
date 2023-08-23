import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { searchBox } from './searchBox';

export const searchForm = (state: WorkspaceState, showSearch: boolean): string => {
  if (showSearch) {
    return `
      <section role="search" class="list__search">
        ${searchBox(state)}
        <fieldset>
          <legend class="a11y__screenreader-text">Search options</legend>
          <ul class="list__search-optionlist">
            <li>
              <vscode-checkbox class="list__search-checkbox" value="matchStart" checked="${
                state.search.matchStart
              }">Match start of text</vscode-checkbox>
            </li>
            <li>
              <vscode-checkbox class="list__search-checkbox" value="caseInsensitive" checked="${
                state.search.caseInsensitive
              }">Case insensitive</vscode-checkbox>
            </li>
          </ul>
        </fieldset>
        <vscode-divider role="separator"></vscode-divider>
      </section>
    `;
  }

  return '';
};
