import { t } from 'vscode-ext-localisation';
import { RenderVars } from '../../../webviews/webviews.interface';
import { File } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { listItemButtons } from './listItemButtons';
import { listItemIcon } from './listItemIcon';

export const listItem = (file: File, renderVars: RenderVars) => {
  const { file: dataFile, isSelected, label, path } = file;
  const tooltip = isSelected
    ? t('webViews.workspace.listItem.selected')
    : t('webViews.workspace.listItem.openCurWin', { label });
  const classes = `list__styled-item ${
    isSelected ? 'list__styled-item--selected' : 'list__styled-item--unselected'
  }`;

  return `
    <li class="list__item list__list-styled-item ${classes}">
      <span class="list__element" data-file="${dataFile}" tabindex="0" title="${tooltip}">
        ${isSelected ? listItemIcon(renderVars) : ''}
        <span class="list__text">
          <span class="list__title">${label}</span>
          ${path ? `<span class="list__description">${path}</span>` : ''}
        </span>
        ${!isSelected ? listItemButtons(file, renderVars) : ''}
      </span>
    </li>
  `;
};
