import { t } from 'vscode-ext-localisation';
import { listView, loadingView } from '..';
import {
  FS_WEBVIEW_CODICONS_CSS,
  FS_WEBVIEW_UI_TOOLKIT_JS,
  FS_WEBVIEW_WORKSPACE_CSS,
  FS_WEBVIEW_WORKSPACE_JS,
} from '../../../constants';
import { WorkspaceState } from '../../../webviews';
import { RenderVars, TemplateVars } from '../../../webviews/webviews.interface';
import { metaTags } from '../../common';
import { dynamicCss } from '../../common/snippets/dynamicCss';
import { errorView } from '../views/errorView';
import { invalidView } from '../views/invalidView';

export const defaultTemplate = (
  {
    codiconsFolderUri,
    cspSource,
    cssFolderUri,
    imgDarkFolderUri,
    imgLightFolderUri,
    nonce,
    scriptFolderUri,
    title,
    uiFolderUri,
  }: TemplateVars,
  state: WorkspaceState
): string => {
  const { state: view } = state;
  const renderVars: RenderVars = { imgDarkFolderUri, imgLightFolderUri };

  let titleAttr = t('views.title');
  let content = '';

  if (view === 'loading') {
    content = loadingView(state, renderVars);
  } else if (view === 'list') {
    titleAttr = t('webViews.workspace.viewTitle', { title });
    content = listView(state, renderVars);
  } else if (view === 'invalid') {
    content = invalidView(state, renderVars);
  } else {
    content = errorView(state, renderVars);
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${metaTags(nonce, cspSource)}
        <title>${titleAttr}</title>
        <link href="${cssFolderUri}/${FS_WEBVIEW_WORKSPACE_CSS}" nonce="${nonce}" rel="stylesheet" type="text/css">
        <link href="${codiconsFolderUri}/${FS_WEBVIEW_CODICONS_CSS}" nonce="${nonce}" rel="stylesheet" type="text/css">
        <style nonce="${nonce}">
          ${dynamicCss(5)}
        </style>
      </head>

      <body>
        ${content}
        <script nonce="${nonce}" src="${scriptFolderUri}/${FS_WEBVIEW_WORKSPACE_JS}"></script>
        <script nonce="${nonce}" src="${uiFolderUri}/${FS_WEBVIEW_UI_TOOLKIT_JS}" type="module"></script>
      </body>
    </html>`;
};
