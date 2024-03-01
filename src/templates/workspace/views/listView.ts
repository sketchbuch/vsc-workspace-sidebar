import { workspace } from 'vscode'
import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { viewLink } from '../../common/snippets/viewLink'
import { viewMsg } from '../../common/snippets/viewMsg'
import { externalWorkspace } from '../snippets/externalWorkspace'
import { folderList } from '../snippets/folderList'
import { hoverNotification } from '../snippets/hoverNotification'
import { list } from '../snippets/list'
import { searchForm } from '../snippets/searchForm'

export const listView = (state: WorkspaceState, renderVars: RenderVars): string => {
  const { fileCount, wsType } = state

  if (fileCount > 0) {
    const wsFolders = workspace.workspaceFolders ? [...workspace.workspaceFolders] : undefined
    const { fileIconsActive, isExternalWs, searchMinimum, themeProcessorState } = renderVars
    const showSearch = searchMinimum === 0 || fileCount >= searchMinimum
    const isLoading = themeProcessorState === 'loading'
    const isFolderOpen = wsType === 'folder'

    return `
        <section class="view list" data-fileiconsactive="${fileIconsActive}" data-folderopen="${isFolderOpen}" data-showsearch="${showSearch}" data-extws="${isExternalWs}">
          ${externalWorkspace(state, renderVars)}
          ${folderList(state, wsFolders)}
          ${searchForm(state, showSearch)}
          ${isLoading ? hoverNotification({ title: t('workspace.list.fileicons.loadingMsg') }) : ''}
          ${list(state, renderVars)}
        </section>
      `
  }

  return `
      <section class="view list list--empty">
        ${viewMsg({ message: t('workspace.list.noWorkspaces.title'), type: 'title' })}
        ${viewMsg({
          message: viewLink(t('workspace.links.checkSettings'), 'SETTINGS'),
          type: 'description',
        })}
      </section>
    `
}
