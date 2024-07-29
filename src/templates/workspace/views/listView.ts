import { workspace } from 'vscode'
import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { externalWorkspace } from '../snippets/externalWorkspace'
import { folderList } from '../snippets/folderList'
import { hoverNotification } from '../snippets/hoverNotification'
import { list } from '../snippets/list'
import { searchForm } from '../snippets/searchForm'

export const listView = (state: WorkspaceState, renderVars: RenderVars): string => {
  const { wsType } = state

  const wsFolders = workspace.workspaceFolders ? [...workspace.workspaceFolders] : undefined
  const { fileIconsActive, isExternalWs, themeProcessorState } = renderVars
  const isLoading = themeProcessorState === 'loading'
  const isFolderOpen = wsType === 'folder'

  return `
    <section 
      class="view list" 
      data-extws="${isExternalWs}"
      data-fileiconsactive="${fileIconsActive}" 
      data-folderopen="${isFolderOpen}" 
    >
      ${externalWorkspace(state, renderVars)}
      ${folderList(state, wsFolders)}
      ${searchForm(state)}
      ${isLoading ? hoverNotification({ title: t('workspace.list.fileicons.loadingMsg') }) : ''}
      ${list(state, renderVars)}
    </section>
  `
}
