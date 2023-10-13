import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { listItem } from './listItem'
import { tree } from './tree'

export const list = (state: WorkspaceState, renderVars: RenderVars): string => {
  console.log('### list()')
  const { rootFolders, search } = state
  const { files, fileTree, visibleFiles } = rootFolders[1]
  const { showTree } = renderVars
  const isFileTree = showTree && fileTree !== null

  console.log('### visibleFiles', visibleFiles)

  if (files.length === 0) {
    return ''
  } else if (visibleFiles.length === 0 && search) {
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
            const { baseFolderLabel, fileTree, visibleFiles } = rootFolder
            const isFileTree = showTree && fileTree !== null

            return `
              <section class="list__list-section">
                <h3 class="list__list-rootLabel">${baseFolderLabel}</h3>
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

/* <ul class="list__list list__styled-list${
  isFileTree !== null ? ' list__styled-list--tree' : ''
}">
  ${
    isFileTree
      ? tree(fileTree, 0, state, renderVars)
      : visibleFiles.map((file) => listItem(file, state, renderVars)).join('')
  }
</ul> */
