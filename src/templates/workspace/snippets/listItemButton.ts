import { RenderVars } from '../../../webviews/webviews.interface';
import { getImgUrls } from '../../getImgUrls';

export interface ListItemButton {
  ariaLabel: string;
  file: string;
  renderVars: RenderVars;
  tooltip: string;
  type: string;
}

export const listItemButton = ({
  ariaLabel,
  file,
  renderVars,
  tooltip,
  type,
}: ListItemButton): string => {
  const icon = getImgUrls(renderVars, type);

  return `
    <vscode-button
      appearance="icon"
      aria-label="${ariaLabel}"
      class="list__button"
      data-file="${file}"
      data-type="${type}"
      title="${tooltip}"
      type="button"
    >
      <img alt="" data-theme="dark" src="${icon.dark}" />
      <img alt="" data-theme="light" src="${icon.light}" />
    </vscode-button>
  `;
};
