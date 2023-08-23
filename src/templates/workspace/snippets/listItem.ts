import { RenderVars } from '../../../webviews/webviews.interface';
import { File, WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { getFileTooltip } from '../../helpers/getFileTooltip';
import { getLabel } from '../../helpers/getLabel';
import { listItemButtons } from './listItemButtons';
import { listItemIcon } from './listItemIcon';

export const listItem = (file: File, state: WorkspaceState, renderVars: RenderVars) => {
  const { search } = state;
  const { file: dataFile, isSelected, label, path, showPath } = file;
  const tooltip = getFileTooltip(renderVars, file, 'cur-win');
  const classes = `list__styled-item ${
    isSelected ? 'list__styled-item--selected' : 'list__styled-item--unselected'
  }`;

  return `
    <li class="list__item list__list-styled-item ${classes}" data-file="${dataFile}">
      <span class="list__element" tabindex="0" title="${tooltip}">
        ${isSelected ? listItemIcon(renderVars) : ''}
        <span class="list__text">
          <span class="list__title">${getLabel(label, search)}</span>
          ${showPath ? `<span class="list__description">${path}</span>` : ''}
        </span>
        ${!isSelected ? listItemButtons(file, renderVars) : ''}
      </span>
    </li>
  `;
};
