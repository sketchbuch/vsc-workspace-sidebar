import { t } from 'vscode-ext-localisation';
import {
  FS_WEBVIEW_CODICONS_CSS,
  FS_WEBVIEW_UI_TOOLKIT_JS,
  FS_WEBVIEW_WORKSPACE_CSS,
  FS_WEBVIEW_WORKSPACE_JS,
} from '../../../constants/fs';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { TemplateVars } from '../../../webviews/webviews.interface';
import { metaTags } from '../../common/snippets/metaTags';
import { getRenderVars } from '../../helpers/getRenderVars';
import { errorView } from '../views/errorView';
import { invalidView } from '../views/invalidView';
import { listView } from '../views/listView';
import { loadingView } from '../views/loadingView';

export const defaultTemplate = (templateVars: TemplateVars, state: WorkspaceState): string => {
  const { codiconsFolderUri, cspSource, cssFolderUri, nonce, scriptFolderUri, title, uiFolderUri } =
    templateVars;
  const { state: view } = state;
  const renderVars = getRenderVars(templateVars);

  let titleAttr = t('views.title');
  let content = '';

  if (view === 'loading') {
    content = loadingView(state, renderVars);
  } else if (view === 'list') {
    titleAttr = t('webViews.workspace.list.title', { title });
    content = listView(state, renderVars);
  } else if (view === 'invalid') {
    content = invalidView(state, renderVars);
  } else {
    content = errorView(state, renderVars);
  }
  content = invalidView({ ...state }, { ...renderVars });

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${metaTags(nonce, cspSource)}
        <title>${titleAttr}</title>
        <link href="${cssFolderUri}/${FS_WEBVIEW_WORKSPACE_CSS}" nonce="${nonce}" rel="stylesheet" type="text/css">
        <link href="${codiconsFolderUri}/${FS_WEBVIEW_CODICONS_CSS}" nonce="${nonce}" rel="stylesheet" type="text/css">
      </head>

      <body>
        ${content}
        <script nonce="${nonce}" id="ws-webview-js" src="${scriptFolderUri}/${FS_WEBVIEW_WORKSPACE_JS}"></script>
        <script nonce="${nonce}" id="codicons-js" src="${uiFolderUri}/${FS_WEBVIEW_UI_TOOLKIT_JS}" type="module"></script>
      </body>
    </html>`;
};
