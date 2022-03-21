import { t } from 'vscode-ext-localisation';
import { RenderVars } from '../../../webviews/webviews.interface';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const loadingView = (state: WorkspaceState, renderVars: RenderVars): string => {
  return `
    <section class="view loading">
      <p class="view__message">
        <span class="view__message-title">
          <span class="view__message-icon codicon codicon-loading codicon-modifier-spin"></span>
          ${t('webViews.workspace.loading')}
        </span>
      </p>
    </section>`;
};
