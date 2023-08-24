import { RenderVars } from '../../../webviews/webviews.interface';
import { getImgUrls } from '../../getImgUrls';

export const listItemIcon = (renderVars: RenderVars): string => {
  const { dark, light } = getImgUrls(renderVars, 'check');

  return `
    <span class="view__icon list__icon">
      <img alt="" data-theme="dark" src="${dark}" />
      <img alt="" data-theme="light" src="${light}" />
    </span>
  `;
};
