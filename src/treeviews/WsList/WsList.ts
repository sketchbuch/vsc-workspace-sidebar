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

  isFolderInvalid: boolean = false;
  loading: boolean = true;
  wsFiles: WsFiles = [];

  constructor(private context: vscode.ExtensionContext) {
    this.getWorkspaceFiles();
  }

  refresh(): void {
    if (!this.loading) {
      this.loading = true;
      this.isFolderInvalid = false;
      this.getWorkspaceFiles();
    }
  }

  getWorkspaceFiles(): void {
    const folder: string = vscode.workspace.getConfiguration().get('workspaceFolder') || '';
    const depth: number = vscode.workspace.getConfiguration().get('workspaceFolderDepth') || 0;

    findWorkspaceFiles(folder, depth).then((wsFiles) => {
      this.loading = false;

      if (wsFiles === false) {
        this.isFolderInvalid = true;
      } else {
        this.wsFiles = wsFiles;
      }
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
      children.push(
        new WsListItem(
          'Collecting workspaces...',
          this.context.extensionPath,
          vscode.TreeItemCollapsibleState.None
        )
      );
    } else if (this.isFolderInvalid) {
      children.push(
        new WsListItem(
          'Folder path is not a directory',
          this.context.extensionPath,
          vscode.TreeItemCollapsibleState.None
        )
      );
    } else if (this.wsFiles.length < 1) {
      children.push(
        new WsListItem(
          'No workspaces found',
          this.context.extensionPath,
          vscode.TreeItemCollapsibleState.None
        )
      );
    } else {
      /* const shouldCleanup: boolean = !!vscode.workspace
        .getConfiguration()
        .get('cleanupWorkspaceLabel'); */
      const shouldCleanup = true;

      const labels = this.wsFiles
        .map((file) => {
          const label = file.substring(file.lastIndexOf('/') + 1).replace(`.${FS_WS_FILETYPE}`, '');

          if (shouldCleanup) {
            return label
              .toLowerCase()
              .replace(/[-|_]/g, ' ')
              .replace(/  +/g, ' ') // Multiple spaces to single
              .split(' ')
              .map((word) => capitalise(word))
              .join(' ');
          }

          return label;
        })
        .sort();

      labels.forEach((label) => {
        children.push(
          new WsListItem(label, this.context.extensionPath, vscode.TreeItemCollapsibleState.None)
        );
      });
    }

    return Promise.resolve(children);
  }
}
