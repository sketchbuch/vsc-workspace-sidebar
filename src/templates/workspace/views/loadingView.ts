import * as pathLib from 'path';
import * as vscode from 'vscode';
import { t } from 'vscode-ext-localisation';
import { WorkspaceState } from '../../../webviews';

export const loadingView = (
  state: WorkspaceState,
  imgDarkFolderUri: vscode.Uri,
  imgLightFolderUri: vscode.Uri
): string => {
  const darkImgSrc = `${imgDarkFolderUri}${pathLib.sep}loading.svg`;
  const lightImgSrc = `${imgLightFolderUri}${pathLib.sep}loading.svg`;

  return `
    <section class="view loading">
      <span class="view__icon loading__icon">
        <img alt="" data-theme="dark" src="${darkImgSrc}" />
        <img alt="" data-theme="light" src="${lightImgSrc}" />
      </span>
      ${t('webViews.workspace.loading')}
    </section>`;
};
