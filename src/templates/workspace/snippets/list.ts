import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { listItem } from './listItem'
import { tree } from './tree'

export const list = (state: WorkspaceState, renderVars: RenderVars): string => {
  const { rootFolders, search } = state
  const { showTree } = renderVars
  const isFileless = rootFolders.every(({ files }) => files.length === 0)
  const isSearchedOut = search && rootFolders.every(({ visibleFiles }) => visibleFiles.length === 0)

  if (isFileless) {
    return ''
  } else if (isSearchedOut) {
    return `
      <div class="list__searchedout">
        <p>${t('workspace.list.search.noMatch')}</p>
      </div>
    `
  }

  return `
      <div class="list__list-wrapper">
        ${rootFolders
          .map((rootFolder) => {
            const { baseFolder, baseFolderLabel, fileTree, visibleFiles } = rootFolder

            if (visibleFiles.length < 1) {
              return ''
            }

            const isFileTree = showTree && fileTree !== null

            return `
              <section class="list__list-section">
                <h3 class="list__list-section-label" title="${baseFolderLabel} (${baseFolder})">${baseFolderLabel}</h3>
                <ul class="list__list list__styled-list${
                  isFileTree !== null ? ' list__styled-list--tree' : ''
                }">
                  ${
                    isFileTree
                      ? tree(fileTree, 0, state, renderVars)
                      : visibleFiles.map((file) => listItem(file, state, renderVars)).join('')
                  }
                </ul>
              </section>
            `
          })
          .join('')}
      </div>
    `
}
