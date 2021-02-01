import * as vscode from 'vscode';
import { list } from '..';
import { WsFiles } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const listView = (
  files: WsFiles | false,
  selected: string,
  imgDarkFolderUri: vscode.Uri,
  imgLightFolderUri: vscode.Uri
): string => {
  if (files) {
    return `
    <section class="view list">
      ${list(files, selected, imgDarkFolderUri, imgLightFolderUri)}
    </section>`;
  }

  return '';
};
