import * as vscode from 'vscode'

export const getMockUri = (extension: string = '', uri: Partial<vscode.Uri> = {}) => {
  return {
    authority: 'localhost',
    fragment: '',
    fsPath: `file://mock-extension-uri/test${extension}`,
    path: `/moc-extension-uri/test${extension}`,
    query: '',
    scheme: 'file',
    toJSON: () => '',
    with: () => {
      return {} as vscode.Uri
    },
    ...uri,
  } as vscode.Uri
}
