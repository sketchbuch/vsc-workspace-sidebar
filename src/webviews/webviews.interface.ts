import * as vscode from 'vscode';

export interface PostMessage<Payload, Actions> {
  action: Actions;
  payload: Payload;
}

export interface RenderVars {
  imgDarkFolderUri: vscode.Uri;
  imgLightFolderUri: vscode.Uri;
}

export interface TemplateVars {
  cspSource: string;
  cssFolderUri: vscode.Uri;
  imgDarkFolderUri: vscode.Uri;
  imgLightFolderUri: vscode.Uri;
  nonce: string;
  scriptFolderUri: vscode.Uri;
}

export type GetHtmlTemplateFunc<TState> = (templateVars: TemplateVars, state: TState) => string;

export interface GetHtml<TState> {
  extensionPath: vscode.Uri;
  template: GetHtmlTemplateFunc<TState>;
  htmlData: HtmlData<TState>;
}

export interface HtmlData<TState> {
  data: TState;
  webview: vscode.Webview;
}
