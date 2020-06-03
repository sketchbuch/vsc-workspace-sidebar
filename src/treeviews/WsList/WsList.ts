import * as vscode from 'vscode';
import { capitalise, findWorkspaceFiles } from '../../utils';
import { FS_WS_FILETYPE } from '../../constants';
import { WsFiles } from '../../types';
import { WsListItem } from '.';

export class WsList implements vscode.TreeDataProvider<WsListItem> {
  _onDidChangeTreeData: vscode.EventEmitter<WsListItem | undefined> = new vscode.EventEmitter<
    WsListItem | undefined
  >();
  onDidChangeTreeData: vscode.Event<WsListItem | undefined> = this._onDidChangeTreeData.event;
  wsFiles: WsFiles = [];
  loading: boolean = true;

  constructor(private context: vscode.ExtensionContext) {
    this.getWorkspaceFiles();
  }

  refresh(): void {
    this.loading = true;
    this.getWorkspaceFiles();
  }

  getWorkspaceFiles(): void {
    findWorkspaceFiles().then((wsFiles) => {
      this.loading = false;
      this.wsFiles = wsFiles;
      this._onDidChangeTreeData.fire(undefined);
    });
  }

  getTreeItem(element: WsListItem): vscode.TreeItem {
    return element;
  }

  getParent(): vscode.ProviderResult<WsListItem> {
    return null;
  }

  getChildren(): Thenable<WsListItem[]> {
    const children: WsListItem[] = [];

    if (this.loading) {
      const loading = new WsListItem(
        'Collecting workspaces...',
        this.context.extensionPath,
        vscode.TreeItemCollapsibleState.None
      );
      children.push(loading);
    } else if (this.wsFiles.length < 1) {
      const none = new WsListItem(
        'No workspaces found',
        this.context.extensionPath,
        vscode.TreeItemCollapsibleState.None
      );
      children.push(none);
    } else {
      const shouldCleanup = true;
      const labels = this.wsFiles
        .map((file) => {
          const label = file.substring(file.lastIndexOf('/') + 1).replace(`.${FS_WS_FILETYPE}`, '');

          if (shouldCleanup) {
            return label
              .toLowerCase()
              .replace(/[-|_]/g, ' ')
              .split(' ')
              .map((word) => capitalise(word))
              .join(' ');
          }

          return label;
        })
        .sort();

      labels.forEach((label) => {
        const item = new WsListItem(
          label,
          this.context.extensionPath,
          vscode.TreeItemCollapsibleState.None
        );
        children.push(item);
      });
    }

    return Promise.resolve(children);
  }
}
