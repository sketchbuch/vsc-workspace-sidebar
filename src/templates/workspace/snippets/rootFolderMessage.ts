import { t } from 'vscode-ext-localisation'
import { FindFileResult } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { viewLink } from '../../common/snippets/viewLink'
import { viewMsg } from '../../common/snippets/viewMsg'

export const rootFolderMessage = (result: FindFileResult, renderVars: RenderVars): string => {
  const isDepthZero = renderVars.depth === 0

  switch (result) {
    case 'is-hidden-excluded':
      return `
        <div class="rootfolder__message">
          ${viewMsg({ message: t('workspace.list.hiddenExcluded.title'), type: 'title' })}
          ${viewMsg({
            message: t('workspace.list.hiddenExcluded.description', {
              settingsLinkHidden: viewLink(
                t('workspace.links.excludeHiddenFolders'),
                'EXCLUDE_HIDDEN_FOLDERS'
              ),
            }),
            type: 'description',
          })}
        </div>
      `

    case 'nonexistent':
      return `
        <div class="rootfolder__message">
          ${viewMsg({ message: t('workspace.list.nonexistent.title'), type: 'title' })}
          ${viewMsg({
            message: t('workspace.list.nonexistent.description', {
              settingsLink: viewLink(t('workspace.links.rootFolder'), 'ROOT_FOLDERS'),
            }),
            type: 'description',
          })}
        </div>
      `

    case 'is-file':
      return `
          <div class="rootfolder__message">
            ${viewMsg({ message: t('workspace.list.isFile.title'), type: 'title' })}
            ${viewMsg({
              message: t('workspace.list.isFile.description', {
                settingsLink: viewLink(t('workspace.links.rootFolder'), 'ROOT_FOLDERS'),
              }),
              type: 'description',
            })}
          </div>
        `

    case 'no-workspaces':
    default:
      return `
        <div class="rootfolder__message">
          ${viewMsg({ message: t('workspace.list.noWorkspaces.title'), type: 'title' })}
          ${viewMsg({
            message: t('workspace.list.noWorkspaces.descriptionSettings', {
              settingsLinkDepth: viewLink(t('workspace.links.depth'), 'DEPTH'),
              settingsLinkRootFolder: viewLink(t('workspace.links.rootFolder'), 'ROOT_FOLDERS'),
            }),
            type: 'description',
          })}
          ${
            isDepthZero
              ? viewMsg({
                  message: t('workspace.list.noWorkspaces.descriptionDepth'),
                  type: 'description',
                })
              : ''
          }
        </div>
      `
  }
}
