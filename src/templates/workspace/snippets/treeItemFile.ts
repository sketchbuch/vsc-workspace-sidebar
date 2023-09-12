import { RenderVars } from '../../../webviews/webviews.interface'
import { getLangIconNew } from '../../../webviews/Workspace/helpers/getLangIcon'
import { File, WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { getFileTooltip } from '../../helpers/getFileTooltip'
import { getLabel } from '../../helpers/getLabel'
import { ConfigButtons, getWorkspaceButtons } from '../../helpers/getWorkspaceButtons'
import { listItemButtons } from './listItemButtons'
import { listItemIcon } from './listItemIcon'
import { treeCustomIconFile, treeIconFile } from './treeIcons'
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
  const { condenseFileTree } = renderVars

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
  const langIcon = getLangIconNew(file.file, renderVars.fileIconKeys)

  //console.log('### fileIconKeys', renderVars.fileIconKeys.length)
  if (langIcon) {
    console.log('### langIcon', langIcon)
  }

  return `
    <li class="${classes}" data-file="${file.file}" data-depth="${depth}">
      ${isSelected ? listItemIcon(renderVars) : ''}
      ${treeIndent(isRootLvlFile ? 0 : depth + 1)}
      <span class="list__element" title="${tooltip}">
        ${langIcon ? treeCustomIconFile(langIcon) : treeIconFile()}
        <span class="list__text">
          <span class="list__title">${getLabel(label, search)}</span>
          ${showPath && condenseFileTree ? `<span class="list__description">${path}</span>` : ''}
        </span>
        ${listItemButtons(itemButtons)}
      </span>
    </li>
  `
}
