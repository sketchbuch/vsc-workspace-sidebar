import * as vscode from 'vscode';
import { WsListItem } from '.';

export class WsList implements vscode.TreeDataProvider<WsListItem> {
  _onDidChangeTreeData: vscode.EventEmitter<WsListItem | undefined> = new vscode.EventEmitter<
    WsListItem | undefined
  >();
  onDidChangeTreeData: vscode.Event<WsListItem | undefined> = this._onDidChangeTreeData.event;

  constructor(private context: vscode.ExtensionContext) {}

  getTreeItem(element: WsListItem): vscode.TreeItem {
    return element;
  }

  getParent(): vscode.ProviderResult<WsListItem> {
    return null;
  }

  getChildren(): Thenable<WsListItem[]> {
    const children: WsListItem[] = [];

    const noneItem = new WsListItem(
      'No workspaces found',
      this.context.extensionPath,
      vscode.TreeItemCollapsibleState.None
    );
    children.push(noneItem);

    return Promise.resolve(children);
  }
}
