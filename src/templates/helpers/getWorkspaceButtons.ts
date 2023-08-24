import { t } from 'vscode-ext-localisation';
import { kebabCaseToCamelCase } from '../../utils/string/kebabCaseToCamelCase';
import { File } from '../../webviews/Workspace/WorkspaceViewProvider.interface';
import { RenderVars } from '../../webviews/webviews.interface';
import { getFileTooltip } from './getFileTooltip';

export interface WorkspaceButton {
  ariaLabel: string;
  file: string;
  renderVars: RenderVars;
  tooltip: string;
  type: string;
}

export type WorkspaceButtons = WorkspaceButton[];

export interface GenericButton {
  file: string;
  key: 'open-filemanager';
  label: string;
}

export interface FileButton {
  file: File;
  key: 'new-window';
}

export type ConfigButtons = (GenericButton | FileButton)[];

interface Config {
  buttons: ConfigButtons;
  renderVars: RenderVars;
}

type GetWorkspaceButtons = (config: Config) => WorkspaceButtons;

export const getWorkspaceButtons: GetWorkspaceButtons = ({ buttons, renderVars }) => {
  const workspaceButtons = buttons.map((btn): WorkspaceButton => {
    if (btn.key === 'new-window') {
      const tooltip = getFileTooltip(renderVars, btn.file, 'new-win');

      return {
        ariaLabel: tooltip,
        file: btn.file.file,
        renderVars,
        tooltip,
        type: btn.key,
      };
    }

    const translationKey = kebabCaseToCamelCase(btn.key);

    return {
      ariaLabel: t(`webViews.workspace.list.itemButtons.${translationKey}.ariaLabel`, {
        label: btn.label,
      }),
      file: btn.file,
      renderVars,
      tooltip: t(`webViews.workspace.list.itemButtons.${translationKey}.tooltip`, {
        label: btn.label,
      }),
      type: btn.key,
    };
  });

  return workspaceButtons;
};
