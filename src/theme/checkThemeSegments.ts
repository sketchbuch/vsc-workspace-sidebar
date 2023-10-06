import { WORKSPACE_ICON } from './constants'

export const checkThemeSegments = (
  nameSegments: string[],
  pathSegments: string[],
  iconMatches: string[]
): string => {
  if (iconMatches.length > 0) {
    for (let seg of nameSegments) {
      for (const iconKey of iconMatches) {
        if (seg === iconKey && iconKey !== WORKSPACE_ICON) {
          return iconKey
        }
      }
    }
  }

  if (pathSegments.length > 0) {
    for (let seg of pathSegments) {
      for (const iconKey of iconMatches) {
        if (seg === iconKey) {
          return iconKey
        }
      }
    }
  }

  return ''
}
