import * as vscode from 'vscode';
import {
  EXT_WSLIST_ITEM_ACTIVE_CTX,
  FS_FOLDER_IMAGES_DARK,
  FS_FOLDER_IMAGES_LIGHT,
} from '../../constants';
import { getImagePath } from '../../utils';

export class WsListItemActive extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly subLabel: string,
    public readonly description: string,
    public readonly extensionPath: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
    this.tooltip = this.subLabel;
    this.description = this.description;
  }

  iconPath = {
    light: getImagePath(this.extensionPath, FS_FOLDER_IMAGES_LIGHT, 'success.svg'),
    dark: getImagePath(this.extensionPath, FS_FOLDER_IMAGES_DARK, 'success.svg'),
  };

  contextValue = EXT_WSLIST_ITEM_ACTIVE_CTX;
}
