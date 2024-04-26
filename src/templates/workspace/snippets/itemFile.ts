import { getFileiconThemeConfig } from '../../../config/core'
import { getLangIcon } from '../../../theme/getLangIcon'
import { File, WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../../webviews/webviews.interface'
import { getDescription } from '../../helpers/getDescription'
import { getFileTooltip } from '../../helpers/getFileTooltip'
import { getLabel } from '../../helpers/getLabel'
import { ConfigButtons, getWorkspaceButtons } from '../../helpers/getWorkspaceButtons'
import { itemButtons } from './itemButtons'
import { itemIconDummy, itemIconFile, itemIconFiletheme, itemIconSelected } from './itemIcons'
import { ItemIndentProps, itemIndent } from './itemIndent'

export type ItemFileProps = {
  depth?: number
  file: File
  renderVars: RenderVars
  state: WorkspaceState
}

export const itemFile = ({ depth, file, renderVars, state }: ItemFileProps): string => {
  const { search } = state
  const { cleanedLabel, file: dataFile, isSelected, label, path, showPath } = file
  const { cleanLabels, condenseFileTree, fileIconKeys, fileIconsActive, themeProcessorState } =
    renderVars

  const isTree = depth !== undefined
  const isRootLvlFile = isTree && depth === 0
  const showDescription = isTree ? showPath && condenseFileTree : showPath
  const description = getDescription(path, isTree && showPath && condenseFileTree)

  const visibleLabel = cleanLabels ? cleanedLabel : label
  const tooltip = getFileTooltip({
    isSelected,
    path,
    renderVars,
    showPath,
    type: 'cur-win',
    visibleLabel,
  })
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

  let classes = `list__styled-item ${
    isSelected ? 'list__styled-item--selected' : 'list__styled-item--unselected'
  }`

  const workspaceButtons = getWorkspaceButtons({ buttons, renderVars })
  const showFileIcon = fileIconsActive && themeProcessorState === 'ready'
  const langIcon = showFileIcon ? getLangIcon(dataFile, fileIconKeys) : ''
  const isFileThemeActive = Boolean(getFileiconThemeConfig())

  const indentProps: ItemIndentProps = { isList: true }

  if (isTree) {
    indentProps.depth = isRootLvlFile ? 1 : depth + 1
    indentProps.isList = false
    classes += ' list__branch-list-item list__branch-list-item-file'
  }

  const dataDepth = depth ?? 0

  return `
    <li 
      aria-label="${tooltip}"
      class="${classes}"
      data-depth="${dataDepth}"
      data-file="${dataFile}"
      title="${tooltip}"
    >
      ${isSelected ? itemIconSelected(renderVars) : ''}
      ${itemIndent(indentProps)}
      <span class="list__element">
        ${
          showFileIcon
            ? itemIconFiletheme(langIcon)
            : isFileThemeActive
            ? itemIconFile()
            : itemIconDummy()
        }
        <span class="list__text">
          <span class="list__title">${getLabel(visibleLabel, search)}</span>
          ${showDescription ? `<span class="list__description">${description}</span>` : ''}
        </span>
        ${itemButtons(workspaceButtons)}
      </span>
    </li>
  `
}
