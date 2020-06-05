import * as vscode from 'vscode';
import { EXT_WSLIST_VIEW_ID } from '../constants';
import { WsList } from '../treeviews';

export const setupSidebar = (context: vscode.ExtensionContext): void => {
  const wsListDataProvider = new WsList(context);

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(EXT_WSLIST_VIEW_ID, wsListDataProvider)
  );

  vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
    /* if (event.affectsConfiguration('cleanupWorkspaceLabel')) {
      wsListDataProvider.refresh();
    } else  */
    if (event.affectsConfiguration('workspaceSidebar.depth')) {
      wsListDataProvider.refresh();
    } else if (event.affectsConfiguration('workspaceSidebar.folder')) {
      wsListDataProvider.refresh();
    }
  });
};
