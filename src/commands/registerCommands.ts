import * as vscode from 'vscode';
import { t } from 'vscode-ext-localisation';
import {
  CMD_OPEN_CUR_WIN,
  CMD_OPEN_NEW_WIN,
  CMD_REFRESH,
  CMD_SORT,
  CMD_VSC_OPEN_WS,
  EXT_SORT,
} from '../constants';
import { WorkspaceViewProvider } from '../webviews';
import { SortIds, SortOptions } from './registerCommands.interface';

export const registerCommands = (
  context: vscode.ExtensionContext,
  workspaceViewProvider: WorkspaceViewProvider
): void => {
  const { registerCommand } = vscode.commands;

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
  ];

  context.subscriptions.push(
    registerCommand(CMD_OPEN_CUR_WIN, (file: string): void => {
      vscode.commands.executeCommand(CMD_VSC_OPEN_WS, vscode.Uri.file(file), false);
    })
  );

  context.subscriptions.push(
    registerCommand(CMD_OPEN_NEW_WIN, (file: string): void => {
      vscode.commands.executeCommand(CMD_VSC_OPEN_WS, vscode.Uri.file(file), true);
    })
  );

  context.subscriptions.push(
    registerCommand(CMD_REFRESH, (): void => {
      workspaceViewProvider.refresh();
    })
  );

  context.subscriptions.push(
    registerCommand(
      CMD_SORT,
      async (): Promise<void> => {
        const sort = context.globalState.get<SortIds>(EXT_SORT) || 'ascending';
        const selection = await vscode.window.showQuickPick(items);

        if (selection && selection.id !== sort) {
          await context.globalState
            .update(EXT_SORT, selection.id)
            .then(() => workspaceViewProvider.updateSort());
        }
      }
    )
  );
};
