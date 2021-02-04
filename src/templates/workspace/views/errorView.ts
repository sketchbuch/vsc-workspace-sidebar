import { t } from 'vscode-ext-localisation';
import { WorkspaceState } from '../../../webviews';
import { RenderVars } from '../../../webviews/webviews.interface';
import { getImgUrls } from '../../getImgUrls';

export const errorView = (state: WorkspaceState, renderVars: RenderVars): string => {
  const { dark, light } = getImgUrls(renderVars, 'error');
  const errorMsg =
    state.error === 'FETCH' ? t('webViews.workspace.error-fetch') : t('webViews.workspace.error');

  return `
    <section class="view error">
      <span class="view__icon error__icon">
        <img alt="" data-theme="dark" src="${dark}" />
        <img alt="" data-theme="light" src="${light}" />
      </span>
      <p class="view__message">
        <span class="view__message--title">${errorMsg}</span>
      </p>
    </section>`;
};
