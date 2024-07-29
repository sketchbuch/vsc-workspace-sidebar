import { t } from 'vscode-ext-localisation'
import { getExcludeHiddenFoldersConfig } from '../../../config/folders'
import { FindFileResult } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { viewLink } from '../../common/snippets/viewLink'
import { viewMsg } from '../../common/snippets/viewMsg'

export const rootFolderMessage = (
  result: FindFileResult,
  rootFolderDepth: number,
  folderPath: string = ''
): string => {
  switch (result) {
    case 'loading':
      const excludeHiddenFoldersConfig = getExcludeHiddenFoldersConfig()

      let message = [
        t('workspace.loading.description', {
          settingsLinkRootFolder: viewLink(t('workspace.links.excludeFolders'), 'EXCLUDE_FOLDERS'),
          settingsLinkDepth: viewLink(t('workspace.links.depth'), 'DEPTH'),
        }),
      ]

      if (!excludeHiddenFoldersConfig) {
        message = [
          t('workspace.loading.descriptionWithHidden', {
            settingsLinkRootFolder: viewLink(
              t('workspace.links.excludeFolders'),
              'EXCLUDE_FOLDERS'
            ),
            settingsLinkHidden: viewLink(
              t('workspace.links.excludeHiddenFolders'),
              'EXCLUDE_HIDDEN_FOLDERS'
            ),
            settingsLinkDepth: viewLink(t('workspace.links.depth'), 'DEPTH'),
          }),
        ]
      }

      return `
        <div class="rootfolder__message" data-type="${result}">
          ${viewMsg({
            message: t('workspace.loading.title'),
            iconType: 'loading',
            type: 'title',
          })}
          ${viewMsg({
            message,
            type: 'description',
          })}
        </div>
      `

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

    case 'map-error':
      return `
        <div class="rootfolder__message" data-type="${result}">
          ${viewMsg({ message: t('workspace.list.mapError.title'), type: 'title' })}
          ${viewMsg({
            message: t('workspace.list.mapError.description', { folderPath }),
            type: 'description',
          })}
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
