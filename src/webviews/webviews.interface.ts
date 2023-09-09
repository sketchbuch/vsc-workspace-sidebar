import * as vscode from 'vscode'
import { ConfigActions } from '../constants/config'
import { ThemeData } from '../theme/ThemeProcessor.interface'

export interface PostMessage<Payload, Actions> {
  action: Actions
  payload: Payload
}

export interface RenderVars {
  clickAction: ConfigActions
  condenseFileTree: boolean
  depth: number
  imgDarkFolderUri: vscode.Uri
  imgLightFolderUri: vscode.Uri
  searchMinimum: number
  showRootFolder: boolean
  showTree: boolean
}

export interface TemplateVars {
  codiconsFolderUri: vscode.Uri
  cspSource: string
  cssFolderUri: vscode.Uri
  imgDarkFolderUri: vscode.Uri
  imgLightFolderUri: vscode.Uri
  nonce: string
  scriptFolderUri: vscode.Uri
  themeData: ThemeData | null
  title: string
  uiFolderUri: vscode.Uri
}

export type GetHtmlTemplateFunc<TState> = (templateVars: TemplateVars, state: TState) => string

export interface GetHtml<TState> {
  extensionPath: vscode.Uri
  htmlData: HtmlData<TState>
  template: GetHtmlTemplateFunc<TState>
  themeData: ThemeData | null
}

export interface HtmlData<TState> {
  state: TState
  title: string
  webview: vscode.Webview
}
