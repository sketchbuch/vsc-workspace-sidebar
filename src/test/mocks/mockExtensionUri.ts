import * as vscode from 'vscode';

export const mockExtensionUri = {
  authority: 'localhost',
  fragment: '',
  fsPath: 'file://moc-extension-uri',
  path: '/moc-extension-uri',
  query: '',
  scheme: 'file',
  toJSON: () => '',
  with: () => {
    return {} as vscode.Uri;
  },
} as vscode.Uri;

export const getMockUri = (extension: string = '', uri: Partial<vscode.Uri> = {}) => {
  return {
    authority: 'localhost',
    fragment: '',
    fsPath: `file://moc-extension-uri/test${extension}`,
    path: `/moc-extension-uri/test${extension}`,
    query: '',
    scheme: 'file',
    toJSON: () => '',
    with: () => {
      return {} as vscode.Uri;
    },
    ...uri,
  } as vscode.Uri;
};
