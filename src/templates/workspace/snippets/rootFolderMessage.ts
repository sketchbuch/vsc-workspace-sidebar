import { t } from 'vscode-ext-localisation'
import { FindFileResult } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { viewMsg } from '../../common/snippets/viewMsg'

export const rootFolderMessage = (result: FindFileResult, renderVars: RenderVars): string => {
  const isDepthZero = renderVars.depth === 0

  switch (result) {
    case 'nonexistent':
      return `
        <div class="rootfolder__message">
          ${viewMsg({ message: t('workspace.list.nonexistent.title'), type: 'title' })}
        </div>
      `

    case 'is-file':
      return `
          <div class="rootfolder__message">
            ${viewMsg({ message: t('workspace.list.isFile.title'), type: 'title' })}
          </div>
        `

    case 'no-workspaces':
    default:
      return `
        <div class="rootfolder__message">
          ${viewMsg({ message: t('workspace.list.noWorkspaces.title'), type: 'title' })}
          ${
            isDepthZero
              ? viewMsg({
                  message: t('workspace.list.noWorkspaces.hintDepth'),
                  type: 'description',
                })
              : ''
          }
          ${viewMsg({
            message: t('workspace.list.noWorkspaces.hintSettings'),
            type: 'description',
          })}
        </div>
      `
  }
}
