import * as vscode from 'vscode';

export const setupExt = (context: vscode.ExtensionContext) => {
  // setupSidebar(context, vscode.workspace.workspaceFolders, packageJsonDataProvider);
};

export const activate = (context: vscode.ExtensionContext): void => {
  setupExt(context);
};
