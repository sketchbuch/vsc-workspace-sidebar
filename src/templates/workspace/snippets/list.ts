import {
  FindFileResult,
  WorkspaceState,
} from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { getListClasses } from '../../helpers/getListClasses'
import { listContent } from './listContent'

export const rootPathErrors: FindFileResult[] = [
  'is-file',
  'map-error',
  'no-workspaces',
  'nonexistent',
]

export const list = (state: WorkspaceState, renderVars: RenderVars): string => {
  const { rootFolders, search } = state
  const { showTree, treeConfig } = renderVars
  const { renderIndentGuides } = treeConfig

  return `
    <div class="list__list-wrapper">
      ${rootFolders
        .map((rootFolder) => {
          const { closedFolders, fileTree, folderName, result } = rootFolder
          const isFileTree = showTree && fileTree !== null
          const isClosed = !search.term && closedFolders.includes(folderName)

          return `
            <section class="list__list-section" data-isclosed="${isClosed}">
              <ul class="${getListClasses(isFileTree)}" data-indent-guides="${renderIndentGuides}">
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
