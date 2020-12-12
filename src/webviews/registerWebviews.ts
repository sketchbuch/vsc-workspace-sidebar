import * as vscode from 'vscode';
import { WorkspaceViewProvider } from '.';

export const registerWebviews = (context: vscode.ExtensionContext): void => {
  const workspaceViewProvider = new WorkspaceViewProvider(
    context.extensionUri,
    context.globalState
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(WorkspaceViewProvider.viewType, workspaceViewProvider)
  );
};
