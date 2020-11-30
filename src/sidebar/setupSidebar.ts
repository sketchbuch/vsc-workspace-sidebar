import * as vscode from 'vscode';
import { EXT_WSLIST_VIEW_ID } from '../constants';
import { WsList } from '../treeviews';
import { isWorkspacefile } from '../utils/fs/isWorkspacefile';

export const setupSidebar = (
  context: vscode.ExtensionContext,
  wsListDataProvider: WsList
): void => {
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(EXT_WSLIST_VIEW_ID, wsListDataProvider)
  );

  vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
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
  });
};
