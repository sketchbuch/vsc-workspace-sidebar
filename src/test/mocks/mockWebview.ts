import * as vscode from 'vscode';

export const mockWebView = {
  asWebviewUri: () => {
    return {} as vscode.Uri;
  },
  cspSource: '34fdg5654dsf',
  html: '',
  onDidReceiveMessage: () => {
    return {} as vscode.Disposable;
  },
  options: {} as vscode.WebviewOptions,
  postMessage: () => Promise.resolve(true),
} as vscode.Webview;
