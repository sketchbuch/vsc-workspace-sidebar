import * as vscode from 'vscode';
import { getVscodeLang, loadTranslations } from '../localisation';
import { setupSidebar } from '../sidebar';
import { registerCommands } from '../commands';

export const setupExt = (context: vscode.ExtensionContext, lang: string) => {
  loadTranslations(lang, context.extensionPath);
  registerCommands(context);
  setupSidebar(context);
};

export const activate = (context: vscode.ExtensionContext): void => {
  setupExt(context, getVscodeLang(process.env.VSCODE_NLS_CONFIG));
};
