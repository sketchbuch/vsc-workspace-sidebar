import { t } from 'vscode-ext-localisation';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const searchBox = (state: WorkspaceState): string => {
  return `
    <div class="searchBox">
      <input 
        aria-label="${t('workspace.searchBox.ariaLabel')}"
        autocapitalize="off"
        autocorrect="off"
        class="searchBox__input"
        id="searchWorkspaces"
        name="search"
        placeholder="${t('workspace.searchBox.placeholder')}"
        spellcheck="false"
        tabindex="0"
        type="search"
        value="${state.search}"
        wrap="off"
      >
    </div>
  `;
};
