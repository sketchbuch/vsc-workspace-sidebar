import { t } from 'vscode-ext-localisation';

export const settingsLink = (): string => {
  const linkText = t('webViews.workspace.checkSettings');

  return `<span role="link" class="view__link view__message-description">${linkText}</span>`;
};
