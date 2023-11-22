import { WorkspaceButtons } from '../../helpers/getWorkspaceButtons'
import { itemButton } from './itemButton'

export const itemButtons = (buttons: WorkspaceButtons): string => {
  return `
    <span class="list__buttons">
      ${buttons.map((btn) => itemButton(btn)).join('')}
    </span>
  `
}
