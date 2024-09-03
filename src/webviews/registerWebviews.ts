import * as vscode from 'vscode'
import { getShowTreeConfig } from '../config/treeview'
import {
  ConfigOptions,
  EXPLORER_CONFIG,
  explorerConfigOptions,
  WORKBENCH_CONFIG,
  workbenchConfigOptions,
  WS_CONFIG,
} from './configOptions'
import { updateByType } from './Workspace/helpers/updateByType'
import { WorkspaceViewProvider } from './Workspace/WorkspaceViewProvider'

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
