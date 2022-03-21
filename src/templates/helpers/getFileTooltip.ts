import { t } from 'vscode-ext-localisation';
import { getActionsConfig } from '../../config/getConfig';
import { ConfigActions } from '../../constants/config';
import { File } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

type TooltipType = 'cur-win' | 'new-win';

export const getFileTooltip = (file: File, type?: TooltipType): string => {
  const clickAction = getActionsConfig();
  const isDefault = clickAction === ConfigActions.CURRENT_WINDOW;

  const { isSelected, label, path, showPath } = file;
  let tooltip = label;

  if (isSelected) {
    tooltip = t('webViews.workspace.listItem.selected');
  } else if ((isDefault && type === 'new-win') || (!isDefault && type === 'cur-win')) {
    tooltip = t('webViews.workspace.listItem.openNewWin', { label });
  } else if ((isDefault && type === 'cur-win') || (!isDefault && type === 'new-win')) {
    tooltip = t('webViews.workspace.listItem.openCurWin', { label });
  }

  return `${tooltip}${showPath ? ` (${path})` : ''}`;
};
