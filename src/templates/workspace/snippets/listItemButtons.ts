import * as pathLib from 'path';
import * as vscode from 'vscode';
import { t } from 'vscode-ext-localisation';

export const listItemButtons = (
  file: string,
  label: string,
  imgDarkFolderUri: vscode.Uri,
  imgLightFolderUri: vscode.Uri
) => {
  const darkImgSrc = `${imgDarkFolderUri}${pathLib.sep}new-window.svg`;
  const lightImgSrc = `${imgLightFolderUri}${pathLib.sep}new-window.svg`;
  const tooltip = t('webViews.workspace.listItem.openNewWin', { label });

  return `
        <span class="list__buttons" data-file="${file}" data-type="new-window" title="${tooltip}">
          <img alt="${t(
            'webViews.workspace.listItem.iconAlt'
          )}" data-theme="dark" src="${darkImgSrc}" />
          <img alt="${t(
            'webViews.workspace.listItem.iconAlt'
          )}" data-theme="light" src="${lightImgSrc}" />
        </span>
      </span>
  `;
};
