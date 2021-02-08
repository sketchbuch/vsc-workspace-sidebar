import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const searchBox = (state: WorkspaceState): string => {
  return `
    <div class="ibwrapper">
      <input 
        aria-label="Search Workspaces"
        autocapitalize="off"
        autocorrect="off"
        class="input setting-control-focus-target"
        id="searchWorkspaces"
        name="search"
        placeholder="Search..."
        spellcheck="false"
        tabindex="0"
        type="search"
        value="${state.search}"
        wrap="off"
      >
    </div>
  `;
};
