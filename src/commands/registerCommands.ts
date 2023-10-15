import * as vscode from 'vscode'
import { QuickPickItem } from 'vscode'
import { t } from 'vscode-ext-localisation'
import {
  CMD_COLLAPSE,
  CMD_EXPAND,
  CMD_FOCUS_SEARCH,
  CMD_OPEN_CUR_WIN,
  CMD_OPEN_NEW_WIN,
  CMD_REFRESH,
  CMD_SORT,
  CMD_VSC_OPEN_WS,
} from '../constants/commands'
import { EXT_SORT } from '../constants/ext'
import { WorkspaceViewProvider } from '../webviews/Workspace/WorkspaceViewProvider'

export type SortIds = 'ascending' | 'descending'

export interface SortOption extends QuickPickItem {
  id: SortIds
}

export type SortOptions = SortOption[]

export const registerCommands = (
  context: vscode.ExtensionContext,
  workspaceViewProvider: WorkspaceViewProvider
): void => {
  const { registerCommand } = vscode.commands

  const items: SortOptions = [
    {
      description: t('sort.ascending.description'),
      id: 'ascending',
      label: t('sort.ascending.label'),
    },
    {
      description: t('sort.descending.description'),
      id: 'descending',
      label: t('sort.descending.label'),
    },
  ]

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
    registerCommand(CMD_REFRESH, (): void => {
      workspaceViewProvider.refresh()
    })
  )

  context.subscriptions.push(
    registerCommand(CMD_SORT, async (): Promise<void> => {
      const sort = context.globalState.get<SortIds>(EXT_SORT) || 'ascending'
      const selection = await vscode.window.showQuickPick(items)

      if (selection && selection.id !== sort) {
        await context.globalState.update(EXT_SORT, selection.id)
        workspaceViewProvider.updateSort()
      }
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
