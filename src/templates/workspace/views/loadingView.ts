import { t } from 'vscode-ext-localisation';
import { WorkspaceState } from '../../../webviews';
import { RenderVars } from '../../../webviews/webviews.interface';
import { getImgUrls } from '../../getImgUrls';

export const loadingView = (state: WorkspaceState, renderVars: RenderVars): string => {
  const { dark, light } = getImgUrls(renderVars, 'loading');

  return `
    <section class="view loading">
      <span class="view__icon loading__icon">
        <img alt="" data-theme="dark" src="${dark}" />
        <img alt="" data-theme="light" src="${light}" />
      </span>
      <p class="view__message">
        <span class="view__message-title">${t('webViews.workspace.loading')}</span>
      </p>
    </section>`;
};
