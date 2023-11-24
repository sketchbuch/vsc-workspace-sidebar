import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { viewLink } from '../../common/snippets/viewLink'

export const errorView = (state: WorkspaceState, renderVars: RenderVars): string => {
  const { error, errorObj } = state
  const isFetch = error === 'FETCH'
  const showStackTrace = errorObj !== null && errorObj.stack

  return `
    <section class="view error">
      <p class="view__message">
        <span class="view__message-title">
          <span class="view__message-icon codicon codicon-error"></span>
          ${isFetch ? t('workspace.error.fetch.title') : t('workspace.error.default.title')}
        </span>
      </p>
      <p class="view__message">
        <span class="view__message-description">
          ${viewLink(t('workspace.links.checkSettings'), 'SETTINGS')}
        </span>
      </p>
      ${
        showStackTrace
          ? `
          <p class="view__message">
            <span class="view__message-description view__message-description--tinytext{">
              ${errorObj.stack || ''}
            </span>
          </p>`
          : ''
      }
    </section>`
}
