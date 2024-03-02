import * as vscode from 'vscode'

export const mockExtensionUri = {
  authority: '',
  fragment: '',
  fsPath: '/moc-extension-uri',
  path: '/moc-extension-uri',
  query: '',
  scheme: 'file',
  toJSON: () => '',
  with: () => {
    return {} as vscode.Uri
  },
} as vscode.Uri

export const getMockUri = (extension: string = '', uri: Partial<vscode.Uri> = {}) => {
  const path = `/moc-extension-uri/test${extension}`
  const fsPath = extension ? '/moc-extension-uri' : path

  return {
    authority: '',
    fragment: '',
    fsPath,
    path,
    query: '',
    scheme: 'file',
    toJSON: () => '',
    with: () => {
      return {} as vscode.Uri
    },
    ...uri,
  } as vscode.Uri
}
