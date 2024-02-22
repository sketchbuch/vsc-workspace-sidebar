import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { viewLink } from '../../common/snippets/viewLink'
import { viewMsg } from '../../common/snippets/viewMsg'

export const loadingView = (state: WorkspaceState, renderVars: RenderVars): string => {
  return `
    <section class="view loading">
      ${viewMsg({
        message: t('workspace.loading.title'),
        iconType: 'loading',
        type: 'title',
      })}
      ${viewMsg({
        message: [
          t('workspace.loading.description'),
          `${viewLink(t('workspace.links.excludeFolders'), 'EXCLUDE_FOLDERS')}.`,
        ],
        type: 'description',
      })}
    </section>
  `
}
