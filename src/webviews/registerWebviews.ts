import * as vscode from 'vscode';
import { WorkspaceViewProvider } from '.';
import { isWorkspacefile } from '../utils';

export const registerWebviews = (context: vscode.ExtensionContext): void => {
  const workspaceViewProvider = new WorkspaceViewProvider(
    context.extensionUri,
    context.globalState
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(WorkspaceViewProvider.viewType, workspaceViewProvider)
  );

  vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
    if (event.affectsConfiguration('workspaceSidebar.depth')) {
      workspaceViewProvider.refresh();
    } else if (event.affectsConfiguration('workspaceSidebar.folder')) {
      workspaceViewProvider.refresh();
    } else if (event.affectsConfiguration('workspaceSidebar.showPaths')) {
      workspaceViewProvider.refresh();
    }
  });

  vscode.workspace.onDidCreateFiles((event: vscode.FileCreateEvent) => {
    if (event.files) {
      const isWorkspace = event.files.some((file) => isWorkspacefile(file.path, file.scheme));

      if (isWorkspace) {
        workspaceViewProvider.refresh();
      }
    }
  });
};
