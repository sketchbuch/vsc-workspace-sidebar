import { t } from 'vscode-ext-localisation'
import { FindFileResult } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'

export const rootFolderMessage = (result: FindFileResult, renderVars: RenderVars): string => {
  const isDepthZero = renderVars.depth === 0

  switch (result) {
    case 'invalid-folder':
      return `
        <div class="rootfolder__message">
          <p class="view__message">
            <span class="view__message-title">
              <span class="view__message-icon codicon codicon-error"></span>
              ${t('workspace.list.notDirectory.title')}
            </span>
          </p>
        </div>
      `

    case 'no-workspaces':
    default:
      return `
        <div class="rootfolder__message">
          <p class="view__message">
            <span class="view__message-title">
              <span class="view__message-icon codicon codicon-error"></span>
              ${t('workspace.list.noWorkspaces.title')}
            </span>
          </p>
          ${
            isDepthZero
              ? `
                <p class="view__message">
                  <span class="view__message-description">
                    ${t('workspace.list.noWorkspaces.hintDepth')}
                  </span>
                </p>`
              : ''
          }
          <p class="view__message">
            <span class="view__message-description">
              ${t('workspace.list.noWorkspaces.hintSettings')}
            </span>
          </p>
        </div>
      `
  }
}
