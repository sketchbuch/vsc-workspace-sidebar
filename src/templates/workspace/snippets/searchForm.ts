import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { searchBox } from './searchBox';

export const searchForm = (state: WorkspaceState, showSearch: boolean): string => {
  if (showSearch) {
    return `
      <div role="search" class="list__search">
        ${searchBox(state)}
      </div>
    `;
  }

  return '';
};
