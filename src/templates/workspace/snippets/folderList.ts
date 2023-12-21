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
        ? 'workspace.list.folder.open'
        : 'workspace.list.folder.open-plural'

    return `
      <div class="list__folder list__styled-pusher">
        <p class="list__folder-title list__styled-pusher-title">
          <strong>
            ${t(title)}
          </strong>
        </p>

        <ul class="list__folder-list list__styled-list">
          ${workspaceFolders.map((folder) => folderListItem(folder)).join('')}
        </ul>

        <div class="list__folder-controls list__styled-pusher-controls">
          <vscode-button class="list__folder-save" id="saveFolderAsWorkspace">
            ${t('workspace.list.folder.saveButton')}
          </vscode-button>
        </div>

        <div class="list__folder-divider list__styled-pusher-divider">
          <vscode-divider class="list__folder-vscodedivider"></vscode-divider>
        </div
      </div>
    `
  }

  return ``
}
