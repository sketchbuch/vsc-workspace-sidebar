import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { viewLink } from '../../common/snippets/viewLink'
import { viewMsg } from '../../common/snippets/viewMsg'

export const invalidView = (state: WorkspaceState, renderVars: RenderVars): string => {
  const isDepthZero = renderVars.depth === 0

  switch (state.result) {
    case 'is-hidden-excluded':
      return `
        <section class="view invalid">
          ${viewMsg({ message: t('workspace.inValid.hiddenExcluded.title'), type: 'title' })}
          ${viewMsg({
            message: t('workspace.inValid.hiddenExcluded.description', {
              settingsLinkHidden: viewLink(
                t('workspace.links.excludeHiddenFolders'),
                'EXCLUDE_HIDDEN_FOLDERS'
              ),
            }),
            type: 'description',
          })}
        </section>
      `

    case 'nonexistent':
      return `
        <section class="view invalid">
          ${viewMsg({ message: t('workspace.inValid.nonexistent.title'), type: 'title' })}
          ${viewMsg({
            message: t('workspace.inValid.nonexistent.description', {
              settingsLink: viewLink(t('workspace.links.rootFolders'), 'ROOT_FOLDERS'),
            }),
            type: 'description',
          })}
        </section>
      `

    case 'is-file':
      return `
        <section class="view invalid">
          ${viewMsg({ message: t('workspace.inValid.isFile.title'), type: 'title' })}
          ${viewMsg({
            message: t('workspace.inValid.isFile.description', {
              settingsLink: viewLink(t('workspace.links.rootFolders'), 'ROOT_FOLDERS'),
            }),
            type: 'description',
          })}
        </section>
      `

    case 'no-root-folders':
      return `
        <section class="view invalid">
          ${viewMsg({ message: t('workspace.inValid.noRootFolders.title'), type: 'title' })}
          ${viewMsg({
            message: t('workspace.inValid.noRootFolders.description', {
              settingsLink: viewLink(t('workspace.links.rootFolders'), 'ROOT_FOLDERS'),
            }),
            type: 'description',
          })}
        </section>
      `

    case 'no-workspaces':
      return `
        <section class="view invalid">
          ${viewMsg({ message: t('workspace.inValid.noWorkspaces.title'), type: 'title' })}
          ${viewMsg({
            message: t('workspace.inValid.noWorkspaces.descriptionSettings', {
              settingsLinkDepth: viewLink(t('workspace.links.depth'), 'DEPTH'),
              settingsLinkRootFolder: viewLink(t('workspace.links.rootFolders'), 'ROOT_FOLDERS'),
            }),
            type: 'description',
          })}
          ${
            !isDepthZero
              ? viewMsg({
                  message: t('workspace.inValid.noWorkspaces.descriptionDepth'),
                  type: 'description',
                })
              : ''
          }
        </section>
      `

    default:
      return `
        <section class="view invalid">
          ${viewMsg({ message: t('workspace.inValid.default.title'), type: 'title' })}
          ${viewMsg({
            message: viewLink(t('workspace.links.checkSettings'), 'SETTINGS'),
            type: 'description',
          })}
        </section>
      `
  }
}
