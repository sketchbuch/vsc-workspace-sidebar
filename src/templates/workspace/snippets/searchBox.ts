import { t } from 'vscode-ext-localisation';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const searchBox = (state: WorkspaceState): string => {
  return `
    <div class="searchBox">
      <vscode-text-field
        aria-label="${t('workspace.list.search.ariaLabel')}"
        id="searchWorkspaces"
        placeholder="${t('workspace.list.search.placeholder')}"
        type="text"
        value="${state.search.term}"
      />
    </div>
  `;
};
