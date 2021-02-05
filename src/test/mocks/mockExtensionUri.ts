import * as vscode from 'vscode';

const mockExtensionUriPath = '/moc-extension-uri';

export const mockExtensionUri = {
  authority: 'localhost',
  fragment: '',
  fsPath: mockExtensionUriPath,
  path: mockExtensionUriPath,
  query: '',
  scheme: 'file',
  toJSON: () => '',
  with: () => {
    return {} as vscode.Uri;
  },
} as vscode.Uri;
