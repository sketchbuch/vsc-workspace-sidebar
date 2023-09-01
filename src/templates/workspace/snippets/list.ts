import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { listItem } from './listItem'
import { tree } from './tree'

export const list = (state: WorkspaceState, renderVars: RenderVars): string => {
  const { files, search, visibleFiles } = state
  const { showTree } = renderVars

  if (files.length === 0) {
    return ''
  } else if (visibleFiles.length === 0 && search) {
    return `
      <div class="list__searchedout">
        <p>${t('webViews.workspace.list.search.noMatch')}</p>
      </div>
    `
  }

  return `
      <ul class="list__list list__styled-list${
        showTree && state.fileTree !== null ? ' list__styled-list--tree show-file-icons' : ''
      }">
        ${
          showTree && state.fileTree !== null
            ? tree(state.fileTree, 0, state, renderVars)
            : visibleFiles.map((file) => listItem(file, state, renderVars)).join('')
        }
      </ul>
    `
}
