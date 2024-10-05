import { t } from 'vscode-ext-localisation'
import { kebabCaseToCamelCase } from '../../utils/string/kebabCaseToCamelCase'
import { File } from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { RenderVars } from '../../webviews/webviews.interface'
import { getFileTooltip } from './getFileTooltip'

export interface WorkspaceButton {
  ariaLabel: string
  codicon?: string
  file: string
  renderVars: RenderVars
  tooltip: string
  type: string
}

export type WorkspaceButtons = WorkspaceButton[]

export interface GenericButton {
  codicon?: string
  file: string
  key: 'open-filemanager' | 'refetch-rootfolder'
  label: string
}

export interface FileButton {
  codicon?: string
  file: File
  key: 'new-window'
}

export type ConfigButton = GenericButton | FileButton
export type ConfigButtons = ConfigButton[]

interface Config {
  buttons: ConfigButtons
  renderVars: RenderVars
}

type GetWorkspaceButtons = (config: Config) => WorkspaceButtons

export const getWorkspaceButtons: GetWorkspaceButtons = ({ buttons, renderVars }) => {
  const workspaceButtons = buttons.map((btn): WorkspaceButton => {
    if (btn.key === 'new-window') {
      const tooltip = getFileTooltip({
        isSelected: btn.file.isSelected,
        path: btn.file.path,
        renderVars,
        showPath: btn.file.showPath,
        type: 'new-win',
        visibleLabel: btn.file.label,
      })

      return {
        ariaLabel: tooltip,
        ...(btn.codicon ? { codicon: btn.codicon } : {}),
        file: btn.file.file,
        renderVars,
        tooltip,
        type: btn.key,
      }
    }

    const translationKey = kebabCaseToCamelCase(btn.key)

    return {
      ariaLabel: t(`workspace.list.itemButtons.${translationKey}.ariaLabel`, {
        label: btn.label,
      }),
      ...(btn.codicon ? { codicon: btn.codicon } : {}),
      file: btn.file,
      renderVars,
      tooltip: t(`workspace.list.itemButtons.${translationKey}.tooltip`, {
        label: btn.label,
      }),
      type: btn.key,
    }
  })

  return workspaceButtons
}
