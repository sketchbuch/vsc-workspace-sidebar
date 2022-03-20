import { t } from 'vscode-ext-localisation';

export const settingsLink = (): string => {
  return `<span role="link" class="view__link view__message-description">
    ${t('webViews.workspace.checkSettings')}
  </span>`;
};
