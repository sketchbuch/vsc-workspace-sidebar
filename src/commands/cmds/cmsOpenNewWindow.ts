import * as vscode from 'vscode';
import { CMD_VSC_OPEN_WS } from '../../constants';

export const cmsOpenNewWindow = (file: string): void => {
  if (file) {
    vscode.commands.executeCommand(CMD_VSC_OPEN_WS, vscode.Uri.file(file), true);
  }
};
