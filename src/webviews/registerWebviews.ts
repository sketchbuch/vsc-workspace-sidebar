import * as vscode from 'vscode';
import { isWorkspaceFile } from '../utils/fs/isWorkspaceFile';
import { WorkspaceViewProvider } from './Workspace/WorkspaceViewProvider';

export const registerWebviews = (
  context: vscode.ExtensionContext,
  workspaceViewProvider: WorkspaceViewProvider
): void => {
  const regWebview = vscode.window.registerWebviewViewProvider(
    WorkspaceViewProvider.viewType,
    workspaceViewProvider
  );

  const configChange = vscode.workspace.onDidChangeConfiguration(
    (event: vscode.ConfigurationChangeEvent) => {
      if (event.affectsConfiguration('workspaceSidebar.depth')) {
        workspaceViewProvider.refresh();
      } else if (event.affectsConfiguration('workspaceSidebar.folder')) {
        workspaceViewProvider.refresh();
      } else if (event.affectsConfiguration('workspaceSidebar.showPaths')) {
        workspaceViewProvider.updateVisibleFiles();
      } else if (event.affectsConfiguration('workspaceSidebar.searchMinimum')) {
        workspaceViewProvider.refresh(true);
      } else if (event.affectsConfiguration('workspaceSidebar.showFolderHierarchy')) {
        workspaceViewProvider.updateVisibleFiles();
      } else if (event.affectsConfiguration('workspaceSidebar.actions')) {
        workspaceViewProvider.refresh(true);
      } else if (event.affectsConfiguration('workspaceSidebar.cleanLabels')) {
        workspaceViewProvider.refresh();
      }
    }
  );

  const createFiles = vscode.workspace.onDidCreateFiles((event: vscode.FileCreateEvent) => {
    const isWorkspace = event.files.some((file) => isWorkspaceFile(file.path, file.scheme));

    if (isWorkspace) {
      workspaceViewProvider.refresh();
    }
  });

  context.subscriptions.push(regWebview);
  context.subscriptions.push(configChange);
  context.subscriptions.push(createFiles);
};
