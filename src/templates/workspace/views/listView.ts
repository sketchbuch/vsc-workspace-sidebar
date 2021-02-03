import * as vscode from 'vscode';
import { list } from '..';
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const listView = (
  state: WorkspaceState,
  imgDarkFolderUri: vscode.Uri,
  imgLightFolderUri: vscode.Uri
): string => {
  if (state.files) {
    return `
    <section class="view list">
      ${list(state, imgDarkFolderUri, imgLightFolderUri)}
    </section>`;
  }

  return '';
};
