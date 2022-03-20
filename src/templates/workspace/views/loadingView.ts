import { t } from 'vscode-ext-localisation';
import { WorkspaceState } from '../../../webviews';
import { RenderVars } from '../../../webviews/webviews.interface';

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
