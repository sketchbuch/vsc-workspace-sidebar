import * as vscode from 'vscode'
import {
  CMD_COLLAPSE,
  CMD_EXPAND,
  CMD_FOCUS_SEARCH,
  CMD_OPEN_CUR_WIN,
  CMD_OPEN_NEW_WIN,
  CMD_REFETCH_ALL,
  CMD_VSC_OPEN_WS,
} from '../constants/commands'
import { WorkspaceViewProvider } from '../webviews/Workspace/WorkspaceViewProvider'

export const registerCommands = (
  context: vscode.ExtensionContext,
  workspaceViewProvider: WorkspaceViewProvider
): void => {
  const { registerCommand } = vscode.commands

  context.subscriptions.push(
    registerCommand(CMD_OPEN_CUR_WIN, async (file: string): Promise<void> => {
      await vscode.commands.executeCommand(CMD_VSC_OPEN_WS, vscode.Uri.file(file), false)
    })
  )

  context.subscriptions.push(
    registerCommand(CMD_OPEN_NEW_WIN, async (file: string): Promise<void> => {
      await vscode.commands.executeCommand(CMD_VSC_OPEN_WS, vscode.Uri.file(file), true)
    })
  )

  context.subscriptions.push(
    registerCommand(CMD_REFETCH_ALL, (): void => {
      workspaceViewProvider.refetchAll()
    })
  )

  context.subscriptions.push(
    registerCommand(CMD_FOCUS_SEARCH, (): void => {
      workspaceViewProvider.focusInput()
    })
  )

  context.subscriptions.push(
    registerCommand(CMD_COLLAPSE, (): void => {
      workspaceViewProvider.toggleAllFolders('collapse')
    })
  )

  context.subscriptions.push(
    registerCommand(CMD_EXPAND, (): void => {
      workspaceViewProvider.toggleAllFolders('expand')
    })
  )
}
