import * as vscode from 'vscode';
import { capitalise, findWorkspaceFiles, sortByLabel } from '../../utils';
import { CMD_OPEN_CUR_WIN, CMD_OPEN_SETTINGS, FS_WS_FILETYPE } from '../../constants';
import { Files, WsListItems } from './WsList.interface';
import { t } from '../../localisation';
import { WsFiles } from '../../types';
import { WsListItem } from '.';
import { WsListItemError } from './WsListItemError';
import { WsListItemErrorSub } from './WsListItemErrorSub';
import { WsListItemLoading } from './WsListItemLoading';

export class WsList implements vscode.TreeDataProvider<WsListItems> {
  _onDidChangeTreeData: vscode.EventEmitter<WsListItems | undefined> = new vscode.EventEmitter<
    WsListItems | undefined
  >();
  onDidChangeTreeData: vscode.Event<WsListItems | undefined> = this._onDidChangeTreeData.event;

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
    const folder: string = vscode.workspace.getConfiguration().get('workspaceSidebar.folder') || '';
    const depth: number = vscode.workspace.getConfiguration().get('workspaceSidebar.depth') || 0;

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

  getTreeItem(element: WsListItems): vscode.TreeItem {
    return element;
  }

  getParent(): vscode.ProviderResult<WsListItems> {
    return null;
  }

  getChildren(): Thenable<WsListItems[]> {
    const children: WsListItems[] = [];

    if (this.loading) {
      children.push(
        new WsListItemLoading(
          t('ext.wsListItem.loading'),
          '',
          this.context.extensionPath,
          vscode.TreeItemCollapsibleState.None
        )
      );
    } else if (this.isFolderInvalid || this.wsFiles.length < 1) {
      if (this.isFolderInvalid) {
        children.push(
          new WsListItemError(
            t('ext.wsListItem.inValid'),
            '',
            this.context.extensionPath,
            vscode.TreeItemCollapsibleState.None,
            {
              command: CMD_OPEN_SETTINGS,
              title: t('ext.wsListItem.checkSettings'),
              arguments: [],
            }
          )
        );
      } else {
        children.push(
          new WsListItemError(
            t('ext.wsListItem.none'),
            '',
            this.context.extensionPath,
            vscode.TreeItemCollapsibleState.None,
            {
              command: CMD_OPEN_SETTINGS,
              title: t('ext.wsListItem.checkSettings'),
              arguments: [],
            }
          )
        );
      }

      children.push(
        new WsListItemErrorSub(
          '',
          t('ext.wsListItem.checkSettings'),
          this.context.extensionPath,
          vscode.TreeItemCollapsibleState.None,
          {
            command: CMD_OPEN_SETTINGS,
            title: t('ext.wsListItem.checkSettings'),
            arguments: [],
          }
        )
      );
    } else {
      /* const shouldCleanup: boolean = !!vscode.workspace
        .getConfiguration()
        .get('cleanupWorkspaceLabel'); */
      const shouldCleanup = true;

      const files: Files = this.wsFiles
        .map((file) => {
          const label = file.substring(file.lastIndexOf('/') + 1).replace(`.${FS_WS_FILETYPE}`, '');

          if (shouldCleanup) {
            return {
              file,
              label: label
                .toLowerCase()
                .replace(/[-|_]/g, ' ')
                .replace(/  +/g, ' ') // Multiple spaces to single
                .split(' ')
                .map((word) => capitalise(word))
                .join(' '),
            };
          }

          return { file, label };
        })
        .sort(sortByLabel);

      files.forEach((item) => {
        const { file, label } = item;

        children.push(
          new WsListItem(
            label,
            t('ext.wsListItem.open.curWindow'),
            this.context.extensionPath,
            vscode.TreeItemCollapsibleState.None,
            {
              command: CMD_OPEN_CUR_WIN,
              title: '',
              arguments: [file],
            }
          )
        );
      });
    }

    return Promise.resolve(children);
  }
}
