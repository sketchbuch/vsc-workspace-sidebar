import * as vscode from 'vscode';
import {
  FS_FOLDER_CSS,
  FS_FOLDER_IMAGES,
  FS_FOLDER_IMAGES_DARK,
  FS_FOLDER_IMAGES_LIGHT,
  FS_FOLDER_JS,
  FS_FOLDER_RESOURCES,
} from '../constants';
import { GetHtml } from '../webviews/webviews.interface';

const { joinPath } = vscode.Uri;

export const getHtml = <T>(
  { extensionPath, template, htmlData }: GetHtml<T>,
  nonce: string
): string => {
  const { data, title, webview } = htmlData;
  const cssFolderUri = webview.asWebviewUri(
    joinPath(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_CSS)
  );
  const imgDarkFolderUri = webview.asWebviewUri(
    joinPath(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_IMAGES, FS_FOLDER_IMAGES_DARK)
  );
  const imgLightFolderUri = webview.asWebviewUri(
    joinPath(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_IMAGES, FS_FOLDER_IMAGES_LIGHT)
  );
  const scriptFolderUri = webview.asWebviewUri(
    joinPath(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_JS)
  );

  return template(
    {
      cspSource: webview.cspSource,
      cssFolderUri,
      imgDarkFolderUri,
      imgLightFolderUri,
      nonce,
      scriptFolderUri,
      title,
    },
    data
  );
};
