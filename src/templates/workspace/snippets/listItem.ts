import * as pathLib from 'path';
import * as vscode from 'vscode';
import { t } from 'vscode-ext-localisation';
import { File } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';

export const listItem = (
  file: File,
  imgDarkFolderUri: vscode.Uri,
  imgLightFolderUri: vscode.Uri
) => {
  const { file: dataFile, label, path, selected } = file;
  const darkImgSrc = `${imgDarkFolderUri}${pathLib.sep}new-window.svg`;
  const lightImgSrc = `${imgLightFolderUri}${pathLib.sep}new-window.svg`;
  const baseTrans = 'webViews.workspace.listItem';

  return `
    <li class="list__item">
      <span class="list__element${
        selected ? ' list__element--selected' : ''
      }" data-file="${dataFile}" tabindex="0" title="${t(`${baseTrans}.openCurWin`)}">
        <span class="list__title">${label}</span>
        ${path && `<span class="list__description">${path}</span>`}
        
        <span class="list__icon" data-file="${dataFile}" data-type="new-window" title="${t(
    `${baseTrans}.openNewWin`
  )}">
          <img alt="${t(`${baseTrans}.iconAlt`)}" data-theme="dark" src="${darkImgSrc}" />
          <img alt="${t(`${baseTrans}.iconAlt`)}" data-theme="light" src="${lightImgSrc}" />
        </span>
      </span>
    </li>
  `;
};
