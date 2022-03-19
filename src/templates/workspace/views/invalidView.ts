import { t } from 'vscode-ext-localisation';
import { WorkspaceState } from '../../../webviews';
import { RenderVars } from '../../../webviews/webviews.interface';
import { settingsLink } from '../../common/snippets/settingsLink';

export const invalidView = (state: WorkspaceState, renderVars: RenderVars): string => {
  return `
    <section class="view invalid">
      <p class="view__message">
        <span class="view__message-title">
          <span class="view__message-icon codicon codicon-error"></span>
          ${t('webViews.workspace.inValid')}
        </span>
        ${settingsLink()}
      </p>
    </section>`;
};
