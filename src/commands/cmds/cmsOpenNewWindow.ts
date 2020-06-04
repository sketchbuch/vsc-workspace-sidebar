import * as vscode from 'vscode';
import { CMD_VSC_OPEN_WS } from '../../constants';

export const cmsOpenNewWindow = (wsFilePath: string): void => {
  vscode.commands.executeCommand(CMD_VSC_OPEN_WS, vscode.Uri.file(wsFilePath), true);
};
