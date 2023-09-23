import { cleanFileIconKey } from 'vscode-file-theme-processor'

export const fileIconFile = (icon: string): string => {
  return `
      <div class="list_branch-icon file-icon file-icon-type-${cleanFileIconKey(icon)}"></div>
    `
}
