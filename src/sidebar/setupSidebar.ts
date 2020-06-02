import * as vscode from 'vscode';
import { EXT_WSLIST_ITEM } from '../constants';
import { WsList } from '../treeviews';

export const setupSidebar = (context: vscode.ExtensionContext): void => {
  const wsListDataProvider = new WsList(context);
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(EXT_WSLIST_ITEM, wsListDataProvider)
  );
};
