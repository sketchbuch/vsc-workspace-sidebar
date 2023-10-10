import * as vscode from 'vscode'
import { getShowTreeConfig } from '../config/treeview'
import { isWorkspaceFile } from '../utils/fs/isWorkspaceFile'
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

      if (affectsConfiguration(WS_CONFIG) || affectsConfiguration(EXPLORER_CONFIG)) {
        for (const { config, type } of configOptions) {
          if (affectsConfiguration(config)) {
            switch (type) {
              case 'tree':
                const showTree = getShowTreeConfig()

                if (showTree) {
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
      }
    }
  )

  const createFiles = vscode.workspace.onDidCreateFiles((event: vscode.FileCreateEvent) => {
    const isWorkspace = event.files.some((file) => isWorkspaceFile(file.path, file.scheme))

    if (isWorkspace) {
      workspaceViewProvider.refresh()
    }
  })

  context.subscriptions.push(regWebview)
  context.subscriptions.push(configChange)
  context.subscriptions.push(createFiles)
}
