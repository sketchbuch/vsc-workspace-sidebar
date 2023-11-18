import { getImgUrls } from '../../getImgUrls'
import { WorkspaceButton } from '../../helpers/getWorkspaceButtons'

export const itemButton = ({
  ariaLabel,
  codicon,
  file,
  renderVars,
  tooltip,
  type,
}: WorkspaceButton): string => {
  const icon = getImgUrls(renderVars, type)

  if (codicon) {
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
        <span class="codicon codicon-${codicon}"></span>
      </vscode-button>
    `
  }

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
  `
}
