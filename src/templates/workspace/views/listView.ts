import { workspace } from 'vscode'
import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { settingsLink } from '../../common/snippets/settingsLink'
import { folderList } from '../snippets/folderList'
import { hoverNotification } from '../snippets/hoverNotification'
import { list } from '../snippets/list'
import { searchForm } from '../snippets/searchForm'

export const listView = (state: WorkspaceState, renderVars: RenderVars): string => {
  if (state.files.length > 0) {
    const wsFolders = workspace.workspaceFolders ? [...workspace.workspaceFolders] : undefined
    const { fileIconsActive, searchMinimum, themeProcessorState } = renderVars
    const showSearch = searchMinimum === 0 || state.files.length >= searchMinimum

    return `
        <section class="view list" data-fileiconsactive="${fileIconsActive}" data-folderopen="${
      state.wsType === 'folder'
    }" data-showsearch="${showSearch}" >
          ${folderList(state, wsFolders)}
          ${searchForm(state, showSearch)}
          ${
            themeProcessorState === 'loading'
              ? hoverNotification({ title: t('workspace.list.fileicons.loadingMsg') })
              : ''
          }
          ${list(state, renderVars)}
        </section>
      `
  }

  return `
      <section class="view list list--empty">
        <p class="view__message">
          <span class="view__message-title">
            <span class="view__message-icon codicon codicon-error"></span>
            ${t('workspace.list.empty.title')}
          </span>
          ${settingsLink()}
        </p>
      </section>
    `
}
