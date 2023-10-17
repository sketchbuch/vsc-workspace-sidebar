import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { settingsLink } from '../../common/snippets/settingsLink'

export const invalidView = (state: WorkspaceState, renderVars: RenderVars): string => {
  const isDepthZero = renderVars.depth === 0

  switch (state.invalidReason) {
    case 'invalid-folder':
      return `
        <section class="view invalid">
          <p class="view__message">
            <span class="view__message-title">
              <span class="view__message-icon codicon codicon-error"></span>
              ${t('workspace.inValid.notDirectory.title')} - 1
            </span>
          </p>
          <p class="view__message">
            ${settingsLink()}
          </p>
        </section>
      `

    case 'no-root-folders':
      return `
        <section class="view invalid">
          <p class="view__message">
            <span class="view__message-title">
              <span class="view__message-icon codicon codicon-error"></span>
              ${t('workspace.inValid.noRootFolders.title')} - 2
            </span>
          </p>
          <p class="view__message">
            ${settingsLink()}
          </p>
        </section>
      `

    case 'no-workspaces':
      return `
        <section class="view invalid">
          <p class="view__message">
            <span class="view__message-title">
              <span class="view__message-icon codicon codicon-error"></span>
              ${t('workspace.inValid.noWorkspaces.title')} - 3
            </span>
          </p>
          ${
            isDepthZero
              ? `
                <p class="view__message">
                  <span class="view__message-description">
                    ${t('workspace.inValid.noWorkspaces.hintDepth')}
                  </span>
                </p>`
              : ''
          }
          <p class="view__message">
            <span class="view__message-description">
              ${t('workspace.inValid.noWorkspaces.hintSettings')}
            </span>
          </p>
          <p class="view__message">
            ${settingsLink()}
          </p>
        </section>
      `

    default:
      return `
        <section class="view invalid">
          <p class="view__message">
            <span class="view__message-title">
              <span class="view__message-icon codicon codicon-error"></span>
              ${t('workspace.inValid.default.title')} - 4
            </span>
          </p>
          <p class="view__message">
            ${settingsLink()}
          </p>
        </section>
      `
  }
}
