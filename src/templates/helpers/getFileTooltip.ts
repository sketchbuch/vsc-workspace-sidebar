import { t } from 'vscode-ext-localisation'
import { ConfigActions } from '../../constants/config'
import { RenderVars } from '../../webviews/webviews.interface'
import { getDescription } from './getDescription'

type GetFileTooltipProps = {
  renderVars: RenderVars
  type?: 'cur-win' | 'new-win'
  visibleLabel: string
  isSelected: boolean
  path: string
  showPath: boolean
}

export const getFileTooltip = ({
  isSelected,
  path,
  renderVars,
  showPath,
  type,
  visibleLabel,
}: GetFileTooltipProps): string => {
  const { condenseFileTree, clickAction, isExternalWs, showTree } = renderVars
  const isDefault = clickAction === ConfigActions.CURRENT_WINDOW

  let tooltip = visibleLabel

  if (isSelected && isExternalWs) {
    tooltip = t('workspace.list.itemButtons.newWindow.selectedExt')
  } else if (isSelected) {
    tooltip = t('workspace.list.itemButtons.newWindow.selected')
  } else if ((isDefault && type === 'new-win') || (!isDefault && type === 'cur-win')) {
    tooltip = t('workspace.list.itemButtons.newWindow.openNewWin', { label: visibleLabel })
  } else if ((isDefault && type === 'cur-win') || (!isDefault && type === 'new-win')) {
    tooltip = t('workspace.list.itemButtons.newWindow.openCurWin', { label: visibleLabel })
  }

  const addTooltipSuffix = showPath && path !== ''
  const tooltipSuffix = getDescription(path, path !== '' && showTree && condenseFileTree)

  return `${tooltip}${addTooltipSuffix ? ` (${tooltipSuffix})` : ''}`
}
