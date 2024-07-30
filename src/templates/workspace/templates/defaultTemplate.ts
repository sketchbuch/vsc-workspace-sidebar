import { t } from 'vscode-ext-localisation'
import {
  FS_WEBVIEW_CODICONS_CSS,
  FS_WEBVIEW_UI_TOOLKIT_JS,
  FS_WEBVIEW_WORKSPACE_CSS,
  FS_WEBVIEW_WORKSPACE_JS,
} from '../../../constants/fs'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { TemplateVars } from '../../../webviews/webviews.interface'
import { fileIconCss } from '../../common/snippets/fileIconCss'
import { metaTags } from '../../common/snippets/metaTags'
import { getRenderVars } from '../../helpers/getRenderVars'
import { workbenchCss } from '../snippets/workbenchCss'
import { workbenchJs } from '../snippets/workbenchJs'
import { errorView } from '../views/errorView'
import { invalidView } from '../views/invalidView'
import { listView } from '../views/listView'

export const defaultTemplate = (templateVars: TemplateVars, state: WorkspaceState): string => {
  const {
    cssData,
    codiconsFolderUri,
    cspSource,
    cssFolderUri,
    nonce,
    scriptFolderUri,
    themeData,
    title,
    uiFolderUri,
  } = templateVars
  const { view } = state
  const renderVars = getRenderVars(templateVars, state)

  let titleAttr = t('views.title')
  let content = ''

  if (view === 'list' || view === 'loading') {
    if (view === 'list') {
      titleAttr = t('workspace.list.title', { title })
    }
    content = listView(state, renderVars)
  } else if (view === 'invalid') {
    content = invalidView(state, renderVars)
  } else {
    content = errorView(state, renderVars)
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${metaTags(nonce, cspSource)}
        <title>${titleAttr}</title>
        <link href="${cssFolderUri}/${FS_WEBVIEW_WORKSPACE_CSS}" nonce="${nonce}" rel="stylesheet" type="text/css">
        <link href="${codiconsFolderUri}/${FS_WEBVIEW_CODICONS_CSS}" nonce="${nonce}" rel="stylesheet" type="text/css">
        ${workbenchCss(nonce, renderVars)}
        ${fileIconCss(nonce, themeData, cssData)}
      </head>

      <body>
        ${content}
        ${workbenchJs(nonce, renderVars)}
        <script nonce="${nonce}" id="ws-webview-js" src="${scriptFolderUri}/${FS_WEBVIEW_WORKSPACE_JS}"></script>
        <script nonce="${nonce}" id="codicons-js" src="${uiFolderUri}/${FS_WEBVIEW_UI_TOOLKIT_JS}" type="module"></script>
      </body>
    </html>`
}
