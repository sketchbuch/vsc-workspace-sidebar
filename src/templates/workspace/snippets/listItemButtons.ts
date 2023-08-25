import { WorkspaceButtons } from '../../helpers/getWorkspaceButtons'
import { listItemButton } from './listItemButton'

export const listItemButtons = (buttons: WorkspaceButtons): string => {
  return `
    <span class="list__buttons">
      ${buttons.map((btn) => listItemButton(btn))}
    </span>
  `
}
