import * as vscode from 'vscode'

export const isHighContrastTheme = (activeColorTheme: vscode.ColorTheme): boolean => {
  return activeColorTheme.kind === 3 || activeColorTheme.kind === 4
}
