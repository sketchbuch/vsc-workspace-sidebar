import * as vscode from 'vscode';
import {
  FS_FOLDER_CSS,
  FS_FOLDER_IMAGES,
  FS_FOLDER_IMAGES_DARK,
  FS_FOLDER_IMAGES_LIGHT,
  FS_FOLDER_JS,
  FS_FOLDER_RESOURCES,
  NONCE_CHARS,
} from '../constants';
import { getNonce } from '../utils';
import { GetHtml } from '../webviews/webviews.interface';

export const getHtml = <T>({ extensionPath, template, htmlData }: GetHtml<T>): string => {
  const { data, webview } = htmlData;
  const cssFolderUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_CSS)
  );
  const imgDarkFolderUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_IMAGES, FS_FOLDER_IMAGES_DARK)
  );
  const imgLightFolderUri = webview.asWebviewUri(
    vscode.Uri.joinPath(
      extensionPath,
      FS_FOLDER_RESOURCES,
      FS_FOLDER_IMAGES,
      FS_FOLDER_IMAGES_LIGHT
    )
  );
  const scriptFolderUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_JS)
  );

  return template(
    {
      cspSource: webview.cspSource,
      cssFolderUri,
      imgDarkFolderUri,
      imgLightFolderUri,
      nonce: getNonce(NONCE_CHARS, Math.random()),
      scriptFolderUri,
    },
    data
  );
};
