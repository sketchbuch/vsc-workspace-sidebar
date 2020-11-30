import * as os from 'os';
import * as vscode from 'vscode';
import { t } from 'vscode-ext-localisation';
import { WsListItem } from '.';
import { SortIds } from '../../commands/registerCommands.interface';
import {
  CMD_OPEN_CUR_WIN,
  CMD_OPEN_SETTINGS,
  EXT_LOADED,
  EXT_SORT,
  EXT_WSSTATE_CACHE,
  EXT_WSSTATE_CACHE_DURATION,
  FS_WS_EXT,
} from '../../constants';
import { WsFiles } from '../../types';
import { capitalise, findWorkspaceFiles, sortByLabel } from '../../utils';
import { WsListItemActive } from './items/WsListItemActive';
import { WsListItemError } from './items/WsListItemError';
import { WsListItemErrorSub } from './items/WsListItemErrorSub';
import { WsListItemLoading } from './items/WsListItemLoading';
import { Files, WsListCache, WsListItems } from './WsList.interface';

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

  refresh(isUiRefesh = false): void {
    if (!this.loading) {
      if (isUiRefesh) {
        this._onDidChangeTreeData.fire(undefined);
      } else {
        this.loading = true;
        this.isFolderInvalid = false;
        vscode.commands.executeCommand('setContext', EXT_LOADED, false);
        this.context.globalState.update(EXT_WSSTATE_CACHE, undefined);
        this._onDidChangeTreeData.fire(undefined);
        this.getWorkspaceFiles();
      }
    }
  }

  getWorkspaceFiles(): void {
    const cachedData = this.context.globalState.get<WsListCache>(EXT_WSSTATE_CACHE);

    if (cachedData) {
      const { files, timestamp } = cachedData;

      if (files && timestamp) {
        const timestampNow = Math.floor(Date.now() / 1000);
        const timestampExpired = timestamp + EXT_WSSTATE_CACHE_DURATION;

        if (timestampNow < timestampExpired) {
          this.loaded(files);
          vscode.commands.executeCommand('setContext', EXT_LOADED, true);
          return;
        } else {
          this.context.globalState.update(EXT_WSSTATE_CACHE, undefined);
        }
      }
    }

    const folder: string = vscode.workspace.getConfiguration().get('workspaceSidebar.folder') || '';
    const depth: number = vscode.workspace.getConfiguration().get('workspaceSidebar.depth') || 0;

    findWorkspaceFiles(folder, depth)
      .then((wsFiles) => {
        this.loaded(wsFiles);
      })
      .finally(() => {
        vscode.commands.executeCommand('setContext', EXT_LOADED, true);
      });
  }

  loaded(wsFiles: false | WsFiles): void {
    this.loading = false;

    if (wsFiles === false) {
      this.isFolderInvalid = true;
    } else {
      this.wsFiles = wsFiles;
      this.context.globalState.update(EXT_WSSTATE_CACHE, {
        files: wsFiles,
        timestamp: Math.floor(Date.now() / 1000),
      });
    }
    this._onDidChangeTreeData.fire(undefined);
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
          this.context.extensionPath,
          vscode.TreeItemCollapsibleState.None
        )
      );
    } else if (this.isFolderInvalid || this.wsFiles.length < 1) {
      if (this.isFolderInvalid) {
        children.push(
          new WsListItemError(
            t('ext.wsListItem.inValid'),
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
      const showPath: boolean =
        vscode.workspace.getConfiguration().get('workspaceSidebar.showPath') || false;
      const folder: string =
        vscode.workspace.getConfiguration().get('workspaceSidebar.folder') || '';
      const cleanedFolder = folder.replace(os.homedir(), '~');
      const sort = this.context.globalState.get<SortIds>(EXT_SORT);

      const files: Files = this.wsFiles
        .map((file) => {
          const lastFolder = file.lastIndexOf('/');
          const label = file.substring(lastFolder + 1).replace(FS_WS_EXT, '');
          const path = showPath
            ? file.substring(0, lastFolder).replace(os.homedir(), '~').replace(cleanedFolder, '…')
            : '';
          return {
            file,
            label: label
              .toLowerCase()
              .replace(/[-|_]/g, ' ')
              .replace(/  +/g, ' ') // Multiple spaces to single
              .split(' ')
              .map((word) => capitalise(word))
              .join(' '),
            path,
          };
        })
        .sort(sortByLabel);

      if (sort === 'descending') {
        files.reverse();
      }

      files.forEach((item) => {
        const { file, label, path } = item;
        const isActive =
          !!vscode.workspace.workspaceFile && vscode.workspace.workspaceFile.fsPath === file;

        if (isActive) {
          children.push(
            new WsListItemActive(
              label,
              t('ext.wsListItem.open.curWindow'),
              path,
              this.context.extensionPath,
              vscode.TreeItemCollapsibleState.None
            )
          );
        } else {
          children.push(
            new WsListItem(
              label,
              t('ext.wsListItem.open.curWindow'),
              path,
              this.context.extensionPath,
              vscode.TreeItemCollapsibleState.None,
              {
                command: CMD_OPEN_CUR_WIN,
                title: '',
                arguments: [file],
              }
            )
          );
        }
      });
    }

    return Promise.resolve(children);
  }
}
