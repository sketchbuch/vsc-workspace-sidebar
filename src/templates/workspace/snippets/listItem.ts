import { getLangIcon } from '../../../theme/getLangIcon'
import { File, WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { getFileTooltip } from '../../helpers/getFileTooltip'
import { getLabel } from '../../helpers/getLabel'
import { ConfigButtons, getWorkspaceButtons } from '../../helpers/getWorkspaceButtons'
import { fileIconFile } from './fileIconFile'
import { listItemButtons } from './listItemButtons'
import { listItemIcon } from './listItemIcon'

export const listItem = (file: File, state: WorkspaceState, renderVars: RenderVars): string => {
  const { search } = state
  const { cleanedLabel, file: dataFile, isSelected, label, path, showPath } = file
  const tooltip = getFileTooltip(renderVars, file, 'cur-win')
  const classes = `list__styled-item ${
    isSelected ? 'list__styled-item--selected' : 'list__styled-item--unselected'
  }`
  const { cleanLabels, fileIconKeys, fileIconsActive, themeProcessorState } = renderVars

  const visibleLabel = cleanLabels ? cleanedLabel : label
  const buttons: ConfigButtons = [
    {
      codicon: 'browser',
      file: dataFile,
      key: 'open-filemanager',
      label: visibleLabel,
    },
  ]

  if (!isSelected) {
    buttons.push({
      key: 'new-window',
      file,
    })
  }

  const itemButtons = getWorkspaceButtons({ buttons, renderVars })
  const showFileIcons = fileIconsActive && themeProcessorState === 'ready'
  const langIcon = showFileIcons ? getLangIcon(dataFile, fileIconKeys) : ''

  return `
    <li aria-label="${tooltip}" class="list__item list__list-styled-item ${classes}" data-file="${dataFile}" title="${tooltip}">
      <span class="list__element" tabindex="0">
        ${isSelected ? listItemIcon(renderVars) : ''}
        ${showFileIcons ? fileIconFile(langIcon) : ''}
        <span class="list__text">
          <span class="list__title">${getLabel(visibleLabel, search)}</span>
          ${showPath ? `<span class="list__description">${path}</span>` : ''}
        </span>
        ${listItemButtons(itemButtons)}
      </span>
    </li>
  `
}
