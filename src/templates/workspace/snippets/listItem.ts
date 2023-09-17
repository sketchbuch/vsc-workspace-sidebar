import { getFileiconThemeConfig } from '../../../config/getConfig'
import { RenderVars } from '../../../webviews/webviews.interface'
import { getLangIconNew } from '../../../webviews/Workspace/helpers/getLangIcon'
import { File, WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { getFileTooltip } from '../../helpers/getFileTooltip'
import { getLabel } from '../../helpers/getLabel'
import { ConfigButtons, getWorkspaceButtons } from '../../helpers/getWorkspaceButtons'
import { fileIconFile } from './fileIconFile'
import { listItemButtons } from './listItemButtons'
import { listItemIcon } from './listItemIcon'

export const listItem = (file: File, state: WorkspaceState, renderVars: RenderVars): string => {
  const { search } = state
  const { file: dataFile, isSelected, label, path, showPath } = file
  const tooltip = getFileTooltip(renderVars, file, 'cur-win')
  const classes = `list__styled-item ${
    isSelected ? 'list__styled-item--selected' : 'list__styled-item--unselected'
  }`
  const { fileIconKeys, themeProcessorState } = renderVars

  const buttons: ConfigButtons = [
    {
      codicon: 'browser',
      file: file.file,
      key: 'open-filemanager',
      label: file.label,
    },
  ]

  if (!isSelected) {
    buttons.push({
      key: 'new-window',
      file,
    })
  }

  const itemButtons = getWorkspaceButtons({ buttons, renderVars })
  const curFileIconTheme = getFileiconThemeConfig()
  const showFileIcon = curFileIconTheme && themeProcessorState === 'data-ready'
  const langIcon = showFileIcon ? getLangIconNew(file.file, fileIconKeys) : ''

  return `
    <li class="list__item list__list-styled-item ${classes}" data-file="${dataFile}">
      <span class="list__element" tabindex="0" title="${tooltip}">
        ${isSelected ? listItemIcon(renderVars) : ''}
        ${showFileIcon ? fileIconFile(langIcon) : ''}
        <span class="list__text">
          <span class="list__title">${getLabel(label, search)}</span>
          ${showPath ? `<span class="list__description">${path}</span>` : ''}
        </span>
        ${listItemButtons(itemButtons)}
      </span>
    </li>
  `
}
