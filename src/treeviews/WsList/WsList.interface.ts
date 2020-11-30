import * as vscode from 'vscode';
import { WsFiles } from '../../types';
import { WsListItem } from './items/WsListItem';
import { WsListItemError } from './items/WsListItemError';
import { WsListItemErrorSub } from './items/WsListItemErrorSub';
import { WsListItemLoading } from './items/WsListItemLoading';

export interface File {
  file: string;
  label: string;
  path: string;
}

export type Files = File[];

export type WsListItems = WsListItem | WsListItemError | WsListItemLoading | WsListItemErrorSub;

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

export interface WsListCache {
  files: WsFiles;
  timestamp: number;
}
