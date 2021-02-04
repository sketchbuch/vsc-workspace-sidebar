import * as pathLib from 'path';
import * as vscode from 'vscode';

export const listItemIcon = (imgDarkFolderUri: vscode.Uri, imgLightFolderUri: vscode.Uri) => {
  const darkImgSrc = `${imgDarkFolderUri}${pathLib.sep}success.svg`;
  const lightImgSrc = `${imgLightFolderUri}${pathLib.sep}success.svg`;

  return `
    <span class="view__icon list__icon">
      <img alt="" data-theme="dark" src="${darkImgSrc}" />
      <img alt="" data-theme="light" src="${lightImgSrc}" />
    </span>
  `;
};
