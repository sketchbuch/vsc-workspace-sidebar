import * as vscode from 'vscode';
import { getShowTreeConfig } from '../config/getConfig';
import { isWorkspaceFile } from '../utils/fs/isWorkspaceFile';
import { ConfigOptions, WS_CONFIG } from './configOptions';
import { WorkspaceViewProvider } from './Workspace/WorkspaceViewProvider';

export const registerWebviews = (
  context: vscode.ExtensionContext,
  workspaceViewProvider: WorkspaceViewProvider,
  configOptions: ConfigOptions
): void => {
  const regWebview = vscode.window.registerWebviewViewProvider(
    WorkspaceViewProvider.viewType,
    workspaceViewProvider
  );

  const configChange = vscode.workspace.onDidChangeConfiguration(
    (event: vscode.ConfigurationChangeEvent) => {
      const { affectsConfiguration } = event;

      if (affectsConfiguration(WS_CONFIG)) {
        configOptions.forEach(({ config, type }) => {
          if (affectsConfiguration(config)) {
            switch (type) {
              case 'tree':
                const showTree = getShowTreeConfig();

                if (showTree) {
                  workspaceViewProvider.updateFileTree();
                }
                break;

              case 'visible-files':
                workspaceViewProvider.updateVisibleFiles();
                break;

              default:
                workspaceViewProvider.refresh(type === 'rerender');
                break;
            }
          }
        });
      }
    }
  );

  const createFiles = vscode.workspace.onDidCreateFiles((event: vscode.FileCreateEvent) => {
    const isWorkspace = event.files.some((file) => isWorkspaceFile(file.path, file.scheme));

    if (isWorkspace) {
      workspaceViewProvider.refresh();
    }
  });

  context.subscriptions.push(regWebview);
  context.subscriptions.push(configChange);
  context.subscriptions.push(createFiles);
};
