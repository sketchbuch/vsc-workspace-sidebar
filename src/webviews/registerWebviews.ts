import * as vscode from 'vscode'
import { getShowTreeConfig } from '../config/treeview'
import { WorkspaceViewProvider } from './Workspace/WorkspaceViewProvider'
import { ConfigOptions, EXPLORER_CONFIG, WS_CONFIG } from './configOptions'

export const registerWebviews = (
  context: vscode.ExtensionContext,
  workspaceViewProvider: WorkspaceViewProvider,
  configOptions: ConfigOptions
): void => {
  const regWebview = vscode.window.registerWebviewViewProvider(
    WorkspaceViewProvider.viewType,
    workspaceViewProvider
  )

  const configChange = vscode.workspace.onDidChangeConfiguration(
    (event: vscode.ConfigurationChangeEvent) => {
      const { affectsConfiguration } = event

      if (affectsConfiguration(WS_CONFIG)) {
        for (const { config, type } of configOptions) {
          if (affectsConfiguration(config)) {
            switch (type) {
              case 'search':
                workspaceViewProvider.updateSearch()
                break

              case 'tree':
                if (getShowTreeConfig()) {
                  workspaceViewProvider.updateFileTree()
                }
                break

              case 'visible-files':
                workspaceViewProvider.updateVisibleFiles()
                break

              default:
                workspaceViewProvider.refresh(type === 'rerender')
                break
            }

            break
          }
        }
      } else if (affectsConfiguration(`${EXPLORER_CONFIG}.compactFolders`)) {
        if (getShowTreeConfig()) {
          workspaceViewProvider.updateFileTree()
        }
      }
    }
  )

  context.subscriptions.push(regWebview)
  context.subscriptions.push(configChange)
}
