import { cleanFileIconKey } from '../../../theme/utils/strings/cleanFileIconKey'

export const fileIconFile = (icon: string): string => {
  return `
      <div class="list_branch-icon file-icon file-icon-lang-${cleanFileIconKey(icon)}"></div>
    `
}
