import { t } from 'vscode-ext-localisation'
import { FindFileResult } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { viewLink } from '../../common/snippets/viewLink'
import { viewMsg } from '../../common/snippets/viewMsg'

export const rootFolderMessage = (result: FindFileResult, rootFolderDepth: number): string => {
  switch (result) {
    case 'nonexistent':
      return `
        <div class="rootfolder__message" data-type="${result}">
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
          <div class="rootfolder__message" data-type="${result}">
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
      const isDepthZero = rootFolderDepth === 0

      return `
        <div class="rootfolder__message" data-type="${result}">
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

    default:
      return `
        <div class="rootfolder__message rootfolder__message--default" data-type="${result}">
          ${viewMsg({ message: t('workspace.list.default.title'), type: 'title' })}
        </div>
        `
  }
}
