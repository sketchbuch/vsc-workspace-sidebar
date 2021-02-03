import { t } from 'vscode-ext-localisation';
import { listView, loadingView } from '..';
import { FS_WEBVIEW_WORKSPACE_CSS, FS_WEBVIEW_WORKSPACE_JS } from '../../../constants';
import { WorkspaceState } from '../../../webviews';
import { GetTemplate } from '../../../webviews/webviews.interface';
import { metaTags } from '../../common';

export const defaultTemplate = (
  {
    cspSource,
    cssFolderUri,
    imgDarkFolderUri,
    imgLightFolderUri,
    nonce,
    scriptFolderUri,
  }: GetTemplate,
  { files, selected, state }: WorkspaceState
): string => {
  let content = '';

  if (state === 'loading') {
    content = loadingView();
  } else if (state === 'list') {
    content = listView(files, selected, imgDarkFolderUri, imgLightFolderUri);
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
