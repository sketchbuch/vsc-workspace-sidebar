import * as os from 'os'
import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { listItem } from './listItem'
import { rootFolderMessage } from './rootFolderMessage'
import { tree } from './tree'

export const list = (state: WorkspaceState, renderVars: RenderVars): string => {
  const { fileCount, rootFolders, search, visibleFileCount } = state

  if (fileCount < 1) {
    return ''
  } else if (search.term && visibleFileCount < 1) {
    return `
      <div class="list__searchedout">
        <p>${t('workspace.list.search.noMatch')}</p>
      </div>
    `
  }

  const { showTree } = renderVars
  const homeDir = os.homedir()

  return `
      <div class="list__list-wrapper">
        ${rootFolders
          .map((rootFolder) => {
            const { fileTree, folderName, folderPath, result, visibleFiles } = rootFolder

            if (search.term && visibleFiles.length < 1) {
              return ''
            }

            const folderPathShort = folderPath.replace(homeDir, `~`)
            const isFileTree = showTree && fileTree !== null
            const classes =
              'list__list list__styled-list' + (isFileTree ? ' list__styled-list--tree' : '')
            let isRootPathError = result === 'invalid-folder' || result === 'no-workspaces'

            return `
              <section class="list__list-section">
                <h3 aria-label="${folderPathShort}" class="list__list-section-label" title="${folderPathShort}">${folderName}</h3>
                ${isRootPathError ? `${rootFolderMessage(result, renderVars)}` : ''}
                ${
                  !isRootPathError
                    ? `<ul class="${classes}">
                          ${
                            isFileTree
                              ? tree(fileTree, 0, rootFolder.closedFolders, state, renderVars)
                              : visibleFiles
                                  .map((file) => listItem(file, state, renderVars))
                                  .join('')
                          }
                        </ul>`
                    : ''
                }
              </section>
            `
          })
          .join('')}
      </div>
    `
}
