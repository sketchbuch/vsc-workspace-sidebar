import { t } from 'vscode-ext-localisation'
import { getExcludeHiddenFoldersConfig } from '../../../config/folders'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { viewLink } from '../../common/snippets/viewLink'
import { viewMsg } from '../../common/snippets/viewMsg'

export const loadingView = (state: WorkspaceState, renderVars: RenderVars): string => {
  const excludeHiddenFoldersConfig = getExcludeHiddenFoldersConfig()

  let message = [
    t('workspace.loading.description', {
      settingsLinkRootFolder: viewLink(t('workspace.links.excludeFolders'), 'EXCLUDE_FOLDERS'),
    }),
  ]

  if (!excludeHiddenFoldersConfig) {
    message = [
      t('workspace.loading.descriptionWithHidden', {
        settingsLinkRootFolder: viewLink(t('workspace.links.excludeFolders'), 'EXCLUDE_FOLDERS'),
        settingsLinkHidden: viewLink(
          t('workspace.links.excludeHiddenFolders'),
          'EXCLUDE_HIDDEN_FOLDERS'
        ),
      }),
    ]
  }

  return `
    <section class="view loading">
      ${viewMsg({
        message: t('workspace.loading.title'),
        iconType: 'loading',
        type: 'title',
      })}
      ${viewMsg({
        message,
        type: 'description',
      })}
    </section>
  `
}
