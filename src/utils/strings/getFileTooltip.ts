import { t } from 'vscode-ext-localisation';
import { File } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

type TooltipType = 'cur-win' | 'new-win';

export const getFileTooltip = (file: File, type?: TooltipType): string => {
  const { isSelected, label, path, showPath } = file;
  let tooltip = label;

  if (isSelected) {
    tooltip = t('webViews.workspace.listItem.selected');
  } else if (type === 'new-win') {
    tooltip = t('webViews.workspace.listItem.openNewWin', { label });
  } else if (type === 'cur-win') {
    tooltip = t('webViews.workspace.listItem.openCurWin', { label });
  }

  return `${tooltip}${showPath ? ` (${path})` : ''}`;
};
