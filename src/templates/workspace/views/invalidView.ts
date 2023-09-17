import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { settingsLink } from '../../common/snippets/settingsLink'

export const invalidView = (state: WorkspaceState, renderVars: RenderVars): string => {
  const isNoWorkspace = state.invalidReason === 'no-workspaces'
  const isInvalidFolder = state.invalidReason === 'invalid-folder'
  const isDepthZero = renderVars.depth === 0

  return `
    <section class="view invalid">
      <p class="view__message">
        <span class="view__message-title">
          <span class="view__message-icon codicon codicon-error"></span>
          ${
            isNoWorkspace
              ? t('workspace.inValid.noWorkspaces.title')
              : isInvalidFolder
              ? t('workspace.inValid.notDirectory.title')
              : t('workspace.inValid.default.title')
          }
        </span>
      </p>
      ${
        isNoWorkspace && isDepthZero
          ? `
            <p class="view__message">
              <span class="view__message-description">
                ${t('workspace.inValid.noWorkspaces.hintDepth')}
              </span>
            </p>`
          : ''
      }
      ${
        isNoWorkspace
          ? `
            <p class="view__message">
              <span class="view__message-description">
                ${t('workspace.inValid.noWorkspaces.hintSettings')}
              </span>
            </p>`
          : ''
      }
      <p class="view__message">
        ${settingsLink()}
      </p>
    </section>`
}
