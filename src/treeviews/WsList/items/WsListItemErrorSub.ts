import * as vscode from 'vscode';
import { EXT_WSLIST_ITEM_ERROR_SUB_CTX } from '../../../constants';

export class WsListItemErrorSub extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly subLabel: string,
    public readonly extensionPath: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
    this.tooltip = this.subLabel;
    this.description = this.subLabel;
  }

  iconPath = {
    light: '',
    dark: '',
  };

  contextValue = EXT_WSLIST_ITEM_ERROR_SUB_CTX;
}
