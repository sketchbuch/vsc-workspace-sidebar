import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'

export const loadingView = (state: WorkspaceState, renderVars: RenderVars): string => {
  return `
    <section class="view loading">
      <p class="view__message">
        <span class="view__message-title">
          <span class="view__message-icon codicon codicon-loading codicon-modifier-spin"></span>
          ${t('workspace.loading.title')}
        </span>
      </p>
    </section>`
}
