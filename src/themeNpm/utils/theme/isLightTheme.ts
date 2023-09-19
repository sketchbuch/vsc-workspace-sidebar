import * as vscode from 'vscode'

export const isLightTheme = (activeColorTheme: vscode.ColorTheme): boolean => {
  return activeColorTheme.kind === 1 || activeColorTheme.kind === 4
}
