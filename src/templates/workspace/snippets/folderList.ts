import * as vscode from 'vscode'
import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { folderListItem } from './folderListItem'

export const folderList = (
  state: WorkspaceState,
  workspaceFolders: vscode.WorkspaceFolder[] | undefined
): string => {
  if (state.wsType === 'folder' && workspaceFolders) {
    const title =
      workspaceFolders.length === 1
        ? 'webViews.workspace.list.folder.open'
        : 'webViews.workspace.list.folder.open-plural'

    return `
      <div class="list__folder">
        <p class="list__folder-title">
          <strong>
            ${t(title)}
          </strong>
        </p>

        <ul class="list__folder-list list__styled-list">
          ${workspaceFolders.map((folder) => folderListItem(folder)).join('')}
        </ul>

        <div class="list__folder-controls">
          <vscode-button class="list__folder-save" id="saveFolderAsWorkspace">
            ${t('webViews.workspace.list.folder.saveButton')}
          </vscode-button>
        </div>
      </div>
    `
  }

  return ``
}
