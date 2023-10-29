import * as vscode from 'vscode'
import {
  FS_FOLDER_CSS,
  FS_FOLDER_IMAGES,
  FS_FOLDER_IMAGES_DARK,
  FS_FOLDER_IMAGES_LIGHT,
  FS_FOLDER_JS,
  FS_FOLDER_RESOURCES,
} from '../constants/fs'
import { GetHtml } from '../webviews/webviews.interface'

const { joinPath } = vscode.Uri

export const getHtml = <T>(
  { cssData, extensionPath, htmlData, template, themeData }: GetHtml<T>,
  nonce: string
): string => {
  const { state, title, webview } = htmlData
  const cssFolderUri = webview.asWebviewUri(
    joinPath(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_CSS)
  )
  const imgDarkFolderUri = webview.asWebviewUri(
    joinPath(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_IMAGES, FS_FOLDER_IMAGES_DARK)
  )
  const imgLightFolderUri = webview.asWebviewUri(
    joinPath(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_IMAGES, FS_FOLDER_IMAGES_LIGHT)
  )
  const scriptFolderUri = webview.asWebviewUri(
    joinPath(extensionPath, FS_FOLDER_RESOURCES, FS_FOLDER_JS)
  )
  const uiFolderUri = webview.asWebviewUri(
    joinPath(extensionPath, 'node_modules', '@vscode', 'webview-ui-toolkit', 'dist')
  )
  const codiconsFolderUri = webview.asWebviewUri(
    joinPath(extensionPath, 'node_modules', '@vscode/codicons', 'dist')
  )

  return template(
    {
      codiconsFolderUri,
      cspSource: webview.cspSource,
      cssData,
      cssFolderUri,
      imgDarkFolderUri,
      imgLightFolderUri,
      nonce,
      scriptFolderUri,
      themeData,
      title,
      uiFolderUri,
    },
    state
  )
}
