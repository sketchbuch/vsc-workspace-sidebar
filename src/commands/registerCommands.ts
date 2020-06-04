import * as vscode from 'vscode';
import { CMD_OPEN_CUR_WIN, CMD_OPEN_NEW_WIN } from '../constants';
import { cmsOpenCurWindow, cmsOpenNewWindow } from './cmds';
import { WsListItemCmd } from '../treeviews/WsList/WsList.interface';

export const registerCommands = (context: vscode.ExtensionContext): void => {
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
};
