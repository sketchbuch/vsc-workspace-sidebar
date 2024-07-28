type ViewMsgCommonProps = {
  isSmall?: boolean
  message: string | string[]
}

type ViewMsgDescriptionProps = {
  iconType?: never
  type: 'description'
} & ViewMsgCommonProps

type ViewMsgTitleProps = {
  iconType?: 'error' | 'loading' | 'search'
  type: 'title'
} & ViewMsgCommonProps

type ViewMsgProps = ViewMsgTitleProps | ViewMsgDescriptionProps

export const viewMsg = ({
  iconType = 'error',
  isSmall = false,
  message,
  type,
}: ViewMsgProps): string => {
  const classes = `view__message-${type}${isSmall ? ` view__message-description--tinytext` : ''}`
  const iconClasses =
    iconType === 'loading' ? 'codicon-loading codicon-modifier-spin' : `codicon-${iconType}`
  const content =
    typeof message === 'string' ? message : message.length === 1 ? message[0] : message.join('\n')

  return `
    <p class="view__message">
      <span class="${classes}">
        ${type === 'title' ? `<span class="view__message-icon codicon ${iconClasses}"></span>` : ''}
        ${content}
      </span>
    </p>
  `
}
