import * as os from 'os'
import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { listItem } from './listItem'
import { tree } from './tree'

export const list = (state: WorkspaceState, renderVars: RenderVars): string => {
  const { fileCount, rootFolders, search, visibleFileCount } = state

  if (fileCount < 1) {
    return ''
  } else if (search && visibleFileCount < 1) {
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
            const { fileTree, folderName, folderPath, visibleFiles } = rootFolder
            const folderPathShort = folderPath.replace(homeDir, `~`)

            if (visibleFiles.length < 1) {
              return ''
            }

            const isFileTree = showTree && fileTree !== null
            let classes =
              'list__list list__styled-list' + (isFileTree ? ' list__styled-list--tree' : '')

            return `
              <section class="list__list-section">
                <h3 aria-label="${folderPathShort}" class="list__list-section-label" title="${folderPathShort}">${folderName}</h3>
                <ul class="${classes}">
                  ${
                    isFileTree
                      ? tree(fileTree, 0, rootFolder.closedFolders, state, renderVars)
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
