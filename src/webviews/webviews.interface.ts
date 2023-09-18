import * as vscode from 'vscode'
import { ConfigActions } from '../constants/config'
import { GetThemeData, ThemeProcessorState } from '../theme/ThemeProcessor.interface'

export interface PostMessage<Payload, Actions> {
  action: Actions
  payload: Payload
}

export interface FileIconKeysCustom {
  [keys: string]: string[]
}

export type FileIconKeys = {
  custom?: FileIconKeysCustom
  file?: string
  fileExtensions?: string[]
  folder?: string
  folderExpanded?: string
  languageIds?: string[]
  rootFolder?: string
  rootFolderExpanded?: string
}

export interface RenderVars {
  clickAction: ConfigActions
  condenseFileTree: boolean
  depth: number
  fileIconKeys: FileIconKeys
  fileIconsActive: boolean
  imgDarkFolderUri: vscode.Uri
  imgLightFolderUri: vscode.Uri
  searchMinimum: number
  showRootFolder: boolean
  showTree: boolean
  themeProcessorState: ThemeProcessorState
}

export interface TemplateVars {
  codiconsFolderUri: vscode.Uri
  cspSource: string
  cssFolderUri: vscode.Uri
  imgDarkFolderUri: vscode.Uri
  imgLightFolderUri: vscode.Uri
  nonce: string
  scriptFolderUri: vscode.Uri
  themeData: GetThemeData | null
  title: string
  uiFolderUri: vscode.Uri
}

export type GetHtmlTemplateFunc<TState> = (
  templateVars: TemplateVars,
  state: TState,
  webview: vscode.Webview
) => string

export interface GetHtml<TState> {
  extensionPath: vscode.Uri
  htmlData: HtmlData<TState>
  template: GetHtmlTemplateFunc<TState>
  themeData: GetThemeData | null
}

export interface HtmlData<TState> {
  state: TState
  title: string
  webview: vscode.Webview
}
