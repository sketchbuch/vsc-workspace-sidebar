import * as vscode from 'vscode';
import { WsListItem } from './WsListItem';
import { WsListItemError } from './WsListItemError';
import { WsListItemLoading } from './WsListItemLoading';

export interface File {
  file: string;
  label: string;
}

export type Files = File[];

export type WsListItems = WsListItem | WsListItemError | WsListItemLoading;

export interface WsListItemCmd extends WsListItem {
  collapsibleState: vscode.TreeItemCollapsibleState;
  label: string;
  subLabel: string;
  extensionPath: string;
  command: vscode.Command;
  iconPath: {
    dark: string;
    light: string;
  };
  contextValue: string;
}
