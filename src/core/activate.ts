import * as vscode from 'vscode';
import { getVscodeLang, loadTranslations } from 'vscode-ext-localisation';
import { registerWebviews } from '../webviews';

export const setupExt = (context: vscode.ExtensionContext, lang: string) => {
  loadTranslations(lang, context.extensionPath);

  /* const wsListDataProvider = new WsList(context);

  registerCommands(context, wsListDataProvider);
  setupSidebar(context, wsListDataProvider); */
  registerWebviews(context);
};

export const activate = (context: vscode.ExtensionContext): void => {
  setupExt(context, getVscodeLang(process.env.VSCODE_NLS_CONFIG));
};
