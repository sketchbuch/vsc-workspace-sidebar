import * as vscode from 'vscode';
import { listItem } from '..';
import { sortFilesByLabel } from '../../../utils';
import { WorkspaceState } from '../../../webviews';
import { convertWsFiles } from '../../../webviews/Workspace/helpers/convertWsFiles';

export const list = (
  state: WorkspaceState,
  imgDarkFolderUri: vscode.Uri,
  imgLightFolderUri: vscode.Uri
) => {
  const { files, selected, sort } = state;

  if (files !== false && files.length) {
    const listFiles = convertWsFiles(files, selected).sort(sortFilesByLabel);

    if (sort === 'descending') {
      listFiles.reverse();
    }

    return `<ul class="list__list">${listFiles
      .map((file) => listItem(file, imgDarkFolderUri, imgLightFolderUri))
      .join('')}</ul>`;
  }

  return '';
};
