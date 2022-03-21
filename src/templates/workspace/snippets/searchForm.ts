import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { searchBox } from './searchBox';

export const searchForm = (state: WorkspaceState, showSearch: boolean): string => {
  if (showSearch) {
    return `
      <form id="searchWorkspacesForm" role="search" class="list__search">
        ${searchBox(state)}
      </form>
    `;
  }

  return '';
};
