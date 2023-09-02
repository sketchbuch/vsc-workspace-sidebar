import * as vscode from 'vscode'
import { getVscodeLang, loadTranslations } from 'vscode-ext-localisation'
import { registerCommands } from '../commands/registerCommands'
import { ThemeDataProcessor } from '../theme/ThemeDataProcessor'
import { WorkspaceViewProvider } from '../webviews/Workspace/WorkspaceViewProvider'
import { configOptions } from '../webviews/configOptions'
import { registerWebviews } from '../webviews/registerWebviews'

export const setupExt = (context: vscode.ExtensionContext, lang: string) => {
  loadTranslations(lang, context.extensionPath)

  const themeProcessor = new ThemeDataProcessor(context)
  const workspaceViewProvider = new WorkspaceViewProvider(context, themeProcessor)

  registerCommands(context, workspaceViewProvider)
  registerWebviews(context, workspaceViewProvider, configOptions)
}

export const activate = (context: vscode.ExtensionContext): void => {
  setupExt(context, getVscodeLang(process.env.VSCODE_NLS_CONFIG))
}
