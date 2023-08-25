import { t } from 'vscode-ext-localisation'

export const settingsLink = (): string => {
  return `<a class="view__link view__message-description">
    ${t('webViews.workspace.checkSettings')}
  </a>`
}
