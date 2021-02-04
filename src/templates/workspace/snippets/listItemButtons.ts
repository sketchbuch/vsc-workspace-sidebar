import { t } from 'vscode-ext-localisation';
import { RenderVars } from '../../../webviews/webviews.interface';
import { getImgUrls } from '../../getImgUrls';

export const listItemButtons = (file: string, label: string, renderVars: RenderVars) => {
  const { dark, light } = getImgUrls(renderVars, 'new-window');
  const tooltip = t('webViews.workspace.listItem.openNewWin', { label });
  const alt = t('webViews.workspace.listItem.iconAlt');

  return `
    <span class="list__buttons" data-file="${file}" data-type="new-window" title="${tooltip}">
      <img alt="${alt}" data-theme="dark" src="${dark}" />
      <img alt="${alt}" data-theme="light" src="${light}" />
    </span>
  `;
};
