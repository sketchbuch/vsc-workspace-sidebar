import * as pathLib from 'path';
import * as vscode from 'vscode';
import { File } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const listItem = (
  file: File,
  imgDarkFolderUri: vscode.Uri,
  imgLightFolderUri: vscode.Uri
) => {
  const { file: dataFile, label, path, selected } = file;
  const tooltip = path ? `${label} (${path})` : `${label}`;

  return `
    <li class="list__item">
      <span class="list__element${
        selected ? ' list__element--selected' : ''
      }" data-file="${dataFile}" tabindex="0" title="${tooltip}">
        <span class="list__title">${label}</span>
        ${path && `<span class="list__description">${path}</span>`}
        <span class="list__icon" data-file="${dataFile}" data-type="new-window" title="Open in new window">
          <img alt="New window icon" data-theme="dark" src="${imgDarkFolderUri}${
    pathLib.sep
  }new-window.svg" />
          <img alt="New window icon" data-theme="light" src="${imgLightFolderUri}${
    pathLib.sep
  }new-window.svg" />
        </span>
      </span>
    </li>
  `;
};
