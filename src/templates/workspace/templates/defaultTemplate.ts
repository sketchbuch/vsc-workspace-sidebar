import { t } from 'vscode-ext-localisation';
import { listView, loadingView } from '..';
import { FS_WEBVIEW_WORKSPACE_CSS, FS_WEBVIEW_WORKSPACE_JS } from '../../../constants';
import { WorkspaceState } from '../../../webviews';
import { RenderVars, TemplateVars } from '../../../webviews/webviews.interface';
import { metaTags } from '../../common';
import { errorView } from '../views/errorView';
import { invalidView } from '../views/invalidView';

export const defaultTemplate = (
  {
    cspSource,
    cssFolderUri,
    imgDarkFolderUri,
    imgLightFolderUri,
    nonce,
    scriptFolderUri,
  }: TemplateVars,
  state: WorkspaceState
): string => {
  const { state: view } = state;
  const renderVars: RenderVars = { imgDarkFolderUri, imgLightFolderUri };

  let content = '';
  console.log('### view', view);

  if (view === 'loading') {
    content = loadingView(state, renderVars);
  } else if (view === 'list') {
    content = listView(state, renderVars);
  } else if (view === 'invalid') {
    content = invalidView(state, renderVars);
  } else if (view === 'error') {
    content = errorView(state, renderVars);
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${metaTags(nonce, cspSource)}
        <title>${t('views.title')}</title>
        <link href="${cssFolderUri}/${FS_WEBVIEW_WORKSPACE_CSS}" nonce="${nonce}" rel="stylesheet" type="text/css">
      </head>

      <body>
        ${content}
        <script nonce="${nonce}" src="${scriptFolderUri}/${FS_WEBVIEW_WORKSPACE_JS}"></script>
      </body>
    </html>`;
};
