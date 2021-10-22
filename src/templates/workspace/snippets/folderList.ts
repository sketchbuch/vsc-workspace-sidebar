import * as vscode from 'vscode';
import { t } from 'vscode-ext-localisation';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { folderListItem } from './folderListItem';

const { workspaceFolders } = vscode.workspace;

export const folderList = (state: WorkspaceState) => {
  if (state.wsType === 'folder' && workspaceFolders) {
    const title =
      workspaceFolders.length === 1
        ? 'webViews.workspace.folder.open'
        : 'webViews.workspace.folder.open-plural';

    return `
      <div class="list__folder">
        <p>${t(title)}</p>

        <ul class="list__folder-list list__styled-list">
          ${workspaceFolders.map((folder) => folderListItem(folder)).join('')}
        </ul>
        <button class="list__folder-save" id="saveFolderAsWorkspace" type="button">${t(
          'webViews.workspace.folder.saveButton'
        )}</button>
      </div>
    `;
  }

  return ``;
};
