import { t } from 'vscode-ext-localisation';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const searchBox = (state: WorkspaceState): string => {
  return `
    <div class="searchBox">
      <vscode-text-field
        aria-label="${t('workspace.searchBox.ariaLabel')}"
        id="searchWorkspaces"
        placeholder="${t('workspace.searchBox.placeholder')}"
        type="search"
        value="${state.search}"
      />
    </div>
  `;
};
