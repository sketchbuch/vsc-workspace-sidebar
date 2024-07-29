import * as vscode from 'vscode'
import { CssData, FileThemeProcessorState, GetThemeData } from 'vscode-file-theme-processor'
import { WorkbenchConfig } from '../config/core'
import { ConfigActions } from '../constants/config'

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
  cleanLabels: boolean
  clickAction: ConfigActions
  condenseFileTree: boolean
  fileIconKeys: FileIconKeys
  fileIconsActive: boolean
  imgDarkFolderUri: vscode.Uri
  imgLightFolderUri: vscode.Uri
  isExternalWs: boolean
  showTree: boolean
  themeProcessorState: FileThemeProcessorState
  treeConfig: WorkbenchConfig
}

export interface TemplateVars {
  cssData: CssData | null
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

export type GetHtmlTemplateFunc<TState> = (templateVars: TemplateVars, state: TState) => string

export interface GetHtml<TState> {
  cssData: CssData | null
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
