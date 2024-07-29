import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { viewLink } from '../../common/snippets/viewLink'
import { viewMsg } from '../../common/snippets/viewMsg'

export const invalidView = (state: WorkspaceState, renderVars: RenderVars): string => {
  switch (state.result) {
    case 'nonexistent':
      return `
        <section class="view invalid" data-type="${state.result}">
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
        <section class="view invalid" data-type="${state.result}">
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
        <section class="view invalid" data-type="${state.result}">
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
      let isDepthZero = true

      state.rootFolders.forEach(({ depth }) => {
        if (isDepthZero && depth > 0) {
          isDepthZero = false
        }
      })

      return `
        <section class="view invalid" data-type="${state.result}">
          ${viewMsg({ message: t('workspace.inValid.noWorkspaces.title'), type: 'title' })}
          ${viewMsg({
            message: t('workspace.inValid.noWorkspaces.descriptionSettings', {
              settingsLinkDepth: viewLink(t('workspace.links.depth'), 'DEPTH'),
              settingsLinkRootFolder: viewLink(t('workspace.links.rootFolder'), 'ROOT_FOLDERS'),
            }),
            type: 'description',
          })}
          ${
            isDepthZero
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
        <section class="view invalid invalid--default" data-type="${state.result}">
          ${viewMsg({ message: t('workspace.inValid.default.title'), type: 'title' })}
          ${viewMsg({
            message: viewLink(t('workspace.links.checkSettings'), 'SETTINGS'),
            type: 'description',
          })}
        </section>
      `
  }
}
