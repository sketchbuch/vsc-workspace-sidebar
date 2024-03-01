import { t } from 'vscode-ext-localisation'
import { ConfigActions } from '../../constants/config'
import { File } from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../webviews/webviews.interface'
import { getDescription } from './getDescription'

type TooltipType = 'cur-win' | 'new-win'

export const getFileTooltip = (renderVars: RenderVars, file: File, type?: TooltipType): string => {
  const { condenseFileTree, cleanLabels, clickAction, isExternalWs, showTree } = renderVars
  const isDefault = clickAction === ConfigActions.CURRENT_WINDOW

  const { cleanedLabel, isSelected, label, path, showPath } = file
  const visibleLabel = cleanLabels ? cleanedLabel : label

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
