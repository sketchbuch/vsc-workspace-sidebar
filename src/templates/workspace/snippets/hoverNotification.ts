interface NotificationProps {
  message?: string
  title?: string
}

/**
 * Currently only supports loading
 */
export const hoverNotification = ({ message, title }: NotificationProps): string => {
  return `
      <div class="hover-notification hover-notification--loading">
        <span class="hover-notification__icon view__message-icon">
          <span class="codicon codicon-loading codicon-modifier-spin"></span>
        </span>
        <div class="hover-notification__text">
          ${
            title
              ? `
            <p class="hover-notification__title">
              <strong>${title}</strong>
            </p>
          `
              : ''
          }
          ${
            message
              ? `
            <p class="hover-notification__message">
            ${message}
            </p>
          `
              : ''
          }
        </div>
      </div>
    `
}
