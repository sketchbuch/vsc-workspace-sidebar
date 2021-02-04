import * as vscode from 'vscode';
import { t } from 'vscode-ext-localisation';
import { getImgSrc } from '../../../utils';
import { WorkspaceState } from '../../../webviews';

export const loadingView = (
  state: WorkspaceState,
  imgDarkFolderUri: vscode.Uri,
  imgLightFolderUri: vscode.Uri
): string => {
  const darkImgSrc = getImgSrc(imgDarkFolderUri, 'loading');
  const lightImgSrc = getImgSrc(imgLightFolderUri, 'loading');

  return `
    <section class="view loading">
      <span class="view__icon loading__icon">
        <img alt="" data-theme="dark" src="${darkImgSrc}" />
        <img alt="" data-theme="light" src="${lightImgSrc}" />
      </span>
      ${t('webViews.workspace.loading')}
    </section>`;
};
