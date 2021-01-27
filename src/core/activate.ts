import * as vscode from 'vscode';
import { getVscodeLang, loadTranslations } from 'vscode-ext-localisation';
import { registerCommands } from '../commands';
import { registerWebviews } from '../webviews';

export const setupExt = (context: vscode.ExtensionContext, lang: string) => {
  loadTranslations(lang, context.extensionPath);

  /*
    registerCommands(context);
    setupSidebar(context);
  */
  registerCommands(context);
  registerWebviews(context);
};

export const activate = (context: vscode.ExtensionContext): void => {
  setupExt(context, getVscodeLang(process.env.VSCODE_NLS_CONFIG));
};
