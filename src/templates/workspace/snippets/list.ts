import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { FileTree } from '../../../webviews/Workspace/helpers/getFileTree'
import { RenderVars } from '../../../webviews/webviews.interface'
import { getListClass } from '../../helpers/getListClass'
import { itemFile } from './itemFile'
import { itemFolder } from './itemFolder'
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

  return `
      <div class="list__list-wrapper">
        ${rootFolders
          .map((rootFolder) => {
            const { closedFolders, fileTree, folderName, folderPath, result, visibleFiles } =
              rootFolder

            if (search.term && visibleFiles.length < 1) {
              return ''
            }

            const isFileTree = showTree && fileTree !== null
            const classes = getListClass(isFileTree)
            let isRootPathError = result === 'invalid-folder' || result === 'no-workspaces'
            const isClosed = closedFolders.includes(folderName)
            const rootFolderFile: FileTree = {
              files: [],
              folderPath,
              folderPathSegment: folderName,
              isRoot: true,
              label: folderName,
              sub: [],
            }

            return `
              <section class="list__list-section">
                ${
                  isRootPathError
                    ? `
                      ${itemFolder({
                        depth: 0,
                        folder: rootFolderFile,
                        isClosed: false,
                        isFolderError: true,
                        renderVars,
                        state,
                      })}
                      ${rootFolderMessage(result, renderVars)}
                    `
                    : ''
                }
                ${
                  !isRootPathError
                    ? `<ul class="${classes}">
                          ${
                            isFileTree
                              ? tree(fileTree, 0, rootFolder.closedFolders, state, renderVars)
                              : ''
                          }
                          ${
                            !isFileTree
                              ? itemFolder({
                                  depth: 0,
                                  folder: rootFolderFile,
                                  isClosed,
                                  renderVars,
                                  state,
                                })
                              : ''
                          }
                          ${
                            !isFileTree && !isClosed
                              ? visibleFiles
                                  .map((file) => itemFile({ file, state, renderVars }))
                                  .join('')
                              : ''
                          }
                        </ul>
                      `
                    : ''
                }
              </section>
            `
          })
          .join('')}
      </div>
    `
}
