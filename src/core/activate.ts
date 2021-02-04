import * as vscode from 'vscode';
import { getVscodeLang, loadTranslations } from 'vscode-ext-localisation';
import { registerCommands } from '../commands';
import { registerWebviews, WorkspaceViewProvider } from '../webviews';

export const setupExt = (context: vscode.ExtensionContext, lang: string) => {
  loadTranslations(lang, context.extensionPath);

  const workspaceViewProvider = new WorkspaceViewProvider(
    context.extensionUri,
    context.globalState
  );

  registerCommands(context, workspaceViewProvider);
  registerWebviews(context, workspaceViewProvider);
};

export const activate = (context: vscode.ExtensionContext): void => {
  setupExt(context, getVscodeLang(process.env.VSCODE_NLS_CONFIG));
};
