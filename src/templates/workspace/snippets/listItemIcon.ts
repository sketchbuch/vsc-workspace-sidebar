import * as vscode from 'vscode';
import { getImgSrc } from '../../../utils';

export const listItemIcon = (imgDarkFolderUri: vscode.Uri, imgLightFolderUri: vscode.Uri) => {
  const darkImgSrc = getImgSrc(imgDarkFolderUri, 'success');
  const lightImgSrc = getImgSrc(imgLightFolderUri, 'success');

  return `
    <span class="view__icon list__icon">
      <img alt="" data-theme="dark" src="${darkImgSrc}" />
      <img alt="" data-theme="light" src="${lightImgSrc}" />
    </span>
  `;
};
