import { t } from 'vscode-ext-localisation'
import {
  FindFileResult,
  WorkspaceState,
} from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { getListClasses } from '../../helpers/getListClasses'
import { listContent } from './listContent'

export const rootPathErrors: FindFileResult[] = [
  'is-file',
  'is-hidden-excluded',
  'map-error',
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
          const { closedFolders, fileTree, folderName, result, visibleFiles } = rootFolder

          if (search.term && visibleFiles.length < 1) {
            return ''
          }

          const isFileTree = showTree && fileTree !== null
          const isClosed = !search.term && closedFolders.includes(folderName)

          return `
            <section class="list__list-section" data-isclosed="${isClosed}">
              <ul class="${getListClasses(isFileTree)}">
                ${listContent({
                  isClosed,
                  isRootPathError: rootPathErrors.includes(result),
                  renderVars,
                  rootFolder,
                  state,
                })}
              </ul>
            </section>
          `
        })
        .join('')}
    </div>
  `
}
