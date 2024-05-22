import { t } from 'vscode-ext-localisation'
import {
  FileTree,
  FindFileResult,
  WorkspaceState,
} from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { getListClasses } from '../../helpers/getListClasses'
import { listElement } from './listElement'
import { listError } from './listError'
import { tree } from './tree'

export const rootPathErrors: FindFileResult[] = [
  'is-file',
  'is-hidden-excluded',
  'no-workspaces',
  'nonexistent',
]

export const list = (state: WorkspaceState, renderVars: RenderVars): string => {
  const { rootFolders, search, visibleFileCount } = state

  if (search.term && visibleFileCount < 1) {
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
          const { closedFolders, depth, fileTree, folderName, folderPath, result, visibleFiles } =
            rootFolder

          if (search.term && visibleFiles.length < 1) {
            return ''
          }

          const isFileTree = showTree && fileTree !== null
          const isRootPathError = rootPathErrors.includes(result)
          const classes = getListClasses(isFileTree)
          const isClosed = !search.term && closedFolders.includes(folderName)

          const rootFolderFile: FileTree = {
            compactedFolders: [],
            files: [],
            folderPath,
            folderPathSegment: folderName,
            isRoot: true,
            label: folderName,
            sub: [],
          }

          return `
            <section class="list__list-section" data-isclosed="${isClosed}">
              ${
                isRootPathError
                  ? listError({ depth, folder: rootFolderFile, renderVars, result, state })
                  : ''
              }
              ${
                !isRootPathError
                  ? `<ul class="${classes}">
                        ${
                          isFileTree
                            ? tree({
                                branch: fileTree,
                                closedFolders: rootFolder.closedFolders,
                                depth: 0,
                                renderVars,
                                state,
                              })
                            : ''
                        }
                        ${listElement({
                          folder: rootFolderFile,
                          isClosed,
                          renderVars,
                          result,
                          state,
                          visibleFiles,
                        })}
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
