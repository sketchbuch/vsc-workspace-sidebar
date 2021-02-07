import * as vscode from 'vscode';

export const mockWebView = {
  asWebviewUri: (response) => response,
  cspSource: '34fdg5654dsf',
  html: '',
  onDidReceiveMessage: () => {
    return {} as vscode.Disposable;
  },
  options: {} as vscode.WebviewOptions,
  postMessage: () => Promise.resolve(true),
} as vscode.Webview;

export const getMockWebviewView = (webviewView: Partial<vscode.WebviewView> = {}) => {
  return {
    description: '',
    onDidChangeVisibility: {} as vscode.Event<void>,
    onDidDispose: {} as vscode.Event<void>,
    show: (preserveFocus?: boolean) => undefined,
    title: '',
    viewType: '',
    visible: true,
    webview: mockWebView,
    ...webviewView,
  } as vscode.WebviewView;
};
