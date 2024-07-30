import * as vscode from 'vscode'
import { getShowTreeConfig } from '../config/treeview'
import { WorkspaceViewProvider } from './Workspace/WorkspaceViewProvider'
import {
  ConfigOptions,
  ConfigOptionType,
  EXPLORER_CONFIG,
  explorerConfigOptions,
  WORKBENCH_CONFIG,
  workbenchConfigOptions,
  WS_CONFIG,
} from './configOptions'

export const updateByType = (
  type: ConfigOptionType,
  workspaceViewProvider: WorkspaceViewProvider,
  isTree: boolean
) => {
  switch (type) {
    case 'search':
      workspaceViewProvider.updateSearch()
      break

    case 'tree':
      if (isTree) {
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
}

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
      const isTree = getShowTreeConfig()

      if (affectsConfiguration(WS_CONFIG)) {
        for (const { config, type } of configOptions) {
          if (affectsConfiguration(config)) {
            updateByType(type, workspaceViewProvider, isTree)
            break
          }
        }
      } else if (affectsConfiguration(EXPLORER_CONFIG)) {
        if (isTree) {
          for (const { config, type } of explorerConfigOptions) {
            if (affectsConfiguration(config)) {
              updateByType(type, workspaceViewProvider, isTree)
              break
            }
          }
        }
      } else if (affectsConfiguration(WORKBENCH_CONFIG)) {
        for (const { config, type } of workbenchConfigOptions) {
          if (affectsConfiguration(config)) {
            updateByType(type, workspaceViewProvider, isTree)
            break
          }
        }
      }
    }
  )

  context.subscriptions.push(regWebview)
  context.subscriptions.push(configChange)
}
