import * as vscode from 'vscode';
import {
  EXT_WSLIST_ITEM_LOADING_CTX,
  FS_FOLDER_IMAGES_DARK,
  FS_FOLDER_IMAGES_LIGHT,
} from '../../../constants';
import { getImagePath } from '../../../utils';

export class WsListItemLoading extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly extensionPath: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
    this.tooltip = this.label;
    this.description = '';
    this.iconPath = {
      light: getImagePath(extensionPath, FS_FOLDER_IMAGES_LIGHT, 'loading.svg'),
      dark: getImagePath(extensionPath, FS_FOLDER_IMAGES_DARK, 'loading.svg'),
    };
  }

  contextValue = EXT_WSLIST_ITEM_LOADING_CTX;
}
