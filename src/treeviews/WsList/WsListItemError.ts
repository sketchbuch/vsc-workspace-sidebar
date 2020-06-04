import * as vscode from 'vscode';
import {
  EXT_WSLIST_ITEM_ERROR_CTX,
  FS_FOLDER_IMAGES_DARK,
  FS_FOLDER_IMAGES_LIGHT,
} from '../../constants';
import { getImagePath } from '../../utils';

export class WsListItemError extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly subLabel: string,
    public readonly extensionPath: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
  }

  get tooltip(): string {
    return `${this.label}`;
  }

  get description(): string {
    return `${this.subLabel}`;
  }

  iconPath = {
    light: getImagePath(this.extensionPath, FS_FOLDER_IMAGES_LIGHT, 'folder-light.svg'),
    dark: getImagePath(this.extensionPath, FS_FOLDER_IMAGES_DARK, 'folder-dark.svg'),
  };

  contextValue = EXT_WSLIST_ITEM_ERROR_CTX;
}
