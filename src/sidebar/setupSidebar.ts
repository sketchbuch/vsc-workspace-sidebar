import * as vscode from 'vscode';

export const setupSidebar = (context: vscode.ExtensionContext): void => {
  /*   vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
    if (event.affectsConfiguration('workspaceSidebar.depth')) {
      wsListDataProvider.refresh();
    } else if (event.affectsConfiguration('workspaceSidebar.folder')) {
      wsListDataProvider.refresh();
    } else if (event.affectsConfiguration('workspaceSidebar.showPath')) {
      wsListDataProvider.refresh(true);
    }
  });

  vscode.workspace.onDidCreateFiles((event: vscode.FileCreateEvent) => {
    if (event.files) {
      const isWorkspace = event.files.some((file) => isWorkspacefile(file.path, file.scheme));

      if (isWorkspace) {
        wsListDataProvider.refresh();
      }
    }
  }); */
};
