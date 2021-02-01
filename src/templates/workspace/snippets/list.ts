import * as vscode from 'vscode';
import { listItem } from '..';
import { sortFilesByLabel } from '../../../utils';
import { convertWsFiles } from '../../../webviews/Workspace/helpers';
import { WsFiles } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const list = (
  wsFiles: WsFiles,
  selected: string,
  imgDarkFolderUri: vscode.Uri,
  imgLightFolderUri: vscode.Uri
) => {
  if (wsFiles.length) {
    const listFiles = convertWsFiles(wsFiles, selected).sort(sortFilesByLabel);

    return `<ul class="list__list">${listFiles
      .map((file) => listItem(file, imgDarkFolderUri, imgLightFolderUri))
      .join('')}</ul>`;
  }

  return '';
};
