import * as vscode from 'vscode';
import { CMD_OPEN_CUR_WIN, CMD_OPEN_NEW_WIN, CMD_OPEN_SETTINGS, CMD_REFRESH } from '../constants';
import { cmsOpenCurWindow, cmsOpenNewWindow } from './cmds';
import { WsList } from '../treeviews';
import { WsListItemCmd } from '../treeviews/WsList/WsList.interface';

export const registerCommands = (
  context: vscode.ExtensionContext,
  wsListDataProvider: WsList
): void => {
  const { registerCommand } = vscode.commands;

  context.subscriptions.push(
    registerCommand(CMD_OPEN_CUR_WIN, (file: string): void => {
      if (file) {
        cmsOpenCurWindow(file);
      }
    })
  );

  context.subscriptions.push(
    registerCommand(CMD_OPEN_NEW_WIN, (wsListItem: WsListItemCmd): void => {
      const {
        command: { arguments: args = [] },
      } = wsListItem;

      if (args[0]) {
        cmsOpenNewWindow(args[0]);
      }
    })
  );

  context.subscriptions.push(
    registerCommand(CMD_OPEN_SETTINGS, (): void => {
      vscode.commands.executeCommand('workbench.action.openSettings', 'workspaceSidebar');
    })
  );

  context.subscriptions.push(
    registerCommand(CMD_REFRESH, (): void => {
      wsListDataProvider.refresh();
    })
  );
};
