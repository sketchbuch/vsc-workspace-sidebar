import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { viewLink } from '../../common/snippets/viewLink'
import { viewMsg } from '../../common/snippets/viewMsg'

export const errorView = (state: WorkspaceState, renderVars: RenderVars): string => {
  const { error, errorObj } = state
  const isFetch = error === 'FETCH'
  const showStackTrace = errorObj !== null && errorObj.stack

  return `
    <section class="view error">
      ${viewMsg({
        message: isFetch ? t('workspace.error.fetch.title') : t('workspace.error.default.title'),
        type: 'title',
      })}
      ${viewMsg({
        message: viewLink(t('workspace.links.checkSettings'), 'SETTINGS'),
        type: 'description',
      })}
      ${
        showStackTrace
          ? viewMsg({
              message: errorObj?.stack ?? '',
              isSmall: true,
              type: 'description',
            })
          : ''
      }
    </section>
  `
}
