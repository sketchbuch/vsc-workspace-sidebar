import { t } from 'vscode-ext-localisation';
import { RenderVars } from '../../../webviews/webviews.interface';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const errorView = (state: WorkspaceState, renderVars: RenderVars): string => {
  const errorMsg =
    state.error === 'FETCH' ? t('webViews.workspace.error-fetch') : t('webViews.workspace.error');

  return `
    <section class="view error">
      <p class="view__message">
        <span class="view__message-title">
          <span class="view__message-icon codicon codicon-error"></span>
          ${errorMsg}
        </span>
      </p>
    </section>`;
};
