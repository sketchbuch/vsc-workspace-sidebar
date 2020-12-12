import { t } from 'vscode-ext-localisation';
import { FS_WEBVIEW_WORKSPACE_CSS, FS_WEBVIEW_WORKSPACE_JS } from '../../../constants';
import { GetTemplate } from '../../../webviews/webviews.interface';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { metaTagsSnippet } from '../../shared';

export const defaultTemplate = (
  { cspSource, cssFolderUri, nonce, scriptFolderUri }: GetTemplate,
  { files, state }: WorkspaceState
): string => {
  let content = 'list';

  if (state === 'loading') {
    //content = loadingView();
    content = 'loading';
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${metaTagsSnippet(nonce, cspSource)}
        <title>${t('views.title')}</title>
        <link href="${cssFolderUri}/${FS_WEBVIEW_WORKSPACE_CSS}" nonce="${nonce}" rel="stylesheet" type="text/css">
      </head>

      <body>
        ${content}
        <script nonce="${nonce}" src="${scriptFolderUri}/${FS_WEBVIEW_WORKSPACE_JS}"></script>
      </body>
    </html>`;
};
