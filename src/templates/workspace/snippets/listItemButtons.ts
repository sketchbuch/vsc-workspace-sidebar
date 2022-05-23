import { t } from 'vscode-ext-localisation';
import { RenderVars } from '../../../webviews/webviews.interface';
import { File } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { getImgUrls } from '../../getImgUrls';
import { getFileTooltip } from '../../helpers/getFileTooltip';

export const listItemButtons = (file: File, renderVars: RenderVars) => {
  const { dark, light } = getImgUrls(renderVars, 'new-window');
  const tooltip = getFileTooltip(renderVars, file, 'new-win');
  const alt = t('webViews.workspace.listItem.iconAlt');

  return `
    <span class="list__buttons" data-file="${file.file}" data-type="new-window" title="${tooltip}">
      <img alt="${alt}" data-theme="dark" src="${dark}" />
      <img alt="${alt}" data-theme="light" src="${light}" />
    </span>
  `;
};
