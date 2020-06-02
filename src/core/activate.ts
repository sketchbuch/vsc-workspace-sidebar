import * as vscode from 'vscode';
import { setupSidebar } from '../sidebar';

export const setupExt = (context: vscode.ExtensionContext) => {
  setupSidebar(context);
};

export const activate = (context: vscode.ExtensionContext): void => {
  setupExt(context);
};
