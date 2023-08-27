import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'

export const errorView = (state: WorkspaceState, renderVars: RenderVars): string => {
  const isFetch = state.error === 'FETCH'

  return `
    <section class="view error">
      <p class="view__message">
        <span class="view__message-title">
          <span class="view__message-icon codicon codicon-error"></span>
          ${isFetch ? t('workspace.error.fetch.title') : t('workspace.error.default.title')}
        </span>
      </p>
    </section>`
}
