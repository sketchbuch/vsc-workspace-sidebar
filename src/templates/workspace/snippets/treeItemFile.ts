import { getLangIcon } from '../../../theme/getLangIcon'
import { File, WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { getFileTooltip } from '../../helpers/getFileTooltip'
import { getLabel } from '../../helpers/getLabel'
import { ConfigButtons, getWorkspaceButtons } from '../../helpers/getWorkspaceButtons'
import { fileIconFile } from './fileIconFile'
import { listItemButtons } from './listItemButtons'
import { listItemIcon } from './listItemIcon'
import { treeIconFile } from './treeIcons'
import { treeIndent } from './treeIndent'

export const treeItemFile = (
  file: File,
  depth: number,
  state: WorkspaceState,
  renderVars: RenderVars
): string => {
  const { search } = state
  const { isSelected, label, path, showPath } = file
  const isRootLvlFile = depth < 0
  const classes = `list__branch-list-item list__branch-list-item-file list__styled-item ${
    isSelected ? 'list__styled-item--selected' : 'list__styled-item--unselected'
  }`
  const tooltip = getFileTooltip(renderVars, file, 'cur-win')
  const { condenseFileTree, fileIconKeys, fileIconsActive, themeProcessorState } = renderVars

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
  const showFileIcon = fileIconsActive && themeProcessorState === 'ready'
  const langIcon = showFileIcon ? getLangIcon(file.file, fileIconKeys) : ''

  return `
    <li class="${classes}" data-file="${file.file}" data-depth="${depth}">
      ${isSelected ? listItemIcon(renderVars) : ''}
      ${treeIndent(isRootLvlFile ? 0 : depth + 1)}
      <span class="list__element" title="${tooltip}">
        ${showFileIcon ? fileIconFile(langIcon) : treeIconFile()}
        <span class="list__text">
          <span class="list__title">${getLabel(label, search)}</span>
          ${showPath && condenseFileTree ? `<span class="list__description">${path}</span>` : ''}
        </span>
        ${listItemButtons(itemButtons)}
      </span>
    </li>
  `
}
