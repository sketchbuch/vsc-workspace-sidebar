import { t } from 'vscode-ext-localisation';
import { ConfigActions } from '../../constants/config';
import { RenderVars } from '../../webviews/webviews.interface';
import { File } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

type TooltipType = 'cur-win' | 'new-win';

export const getFileTooltip = (renderVars: RenderVars, file: File, type?: TooltipType): string => {
  const { clickAction } = renderVars;
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
