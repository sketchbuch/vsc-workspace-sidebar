import * as vscode from 'vscode'
import { getVscodeLang, loadTranslations } from 'vscode-ext-localisation'
import { FileThemeProcessor } from 'vscode-file-theme-processor'
import { registerCommands } from '../commands/registerCommands'
import { WorkspaceViewProvider } from '../webviews/Workspace/WorkspaceViewProvider'
import { configOptions } from '../webviews/configOptions'
import { registerWebviews } from '../webviews/registerWebviews'

export const setupExt = (context: vscode.ExtensionContext, lang: string) => {
  loadTranslations(lang, context.extensionPath)

  const fileThemeProcessor = new FileThemeProcessor(context)
  const workspaceViewProvider = new WorkspaceViewProvider(context, fileThemeProcessor)

  registerCommands(context, workspaceViewProvider)
  registerWebviews(context, workspaceViewProvider, configOptions)
}

export const activate = (context: vscode.ExtensionContext): void => {
  setupExt(context, getVscodeLang(process.env.VSCODE_NLS_CONFIG))
}
