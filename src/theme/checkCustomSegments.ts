import { FileIconKeysCustom } from '../webviews/webviews.interface'

export const checkCustomSegments = (
  custom: FileIconKeysCustom,
  nameSegments: string[],
  pathSegments: string[],
  iconMatches: string[]
): string => {
  const customKeys = Object.keys(custom)

  if (iconMatches.length > 0 && customKeys.length > 0) {
    for (const iconKey of iconMatches) {
      for (const customKey of customKeys) {
        // If there is actually an icon definition for the customer icon
        if (customKey === iconKey) {
          for (let seg of nameSegments) {
            for (const customIconKey of custom[customKey]) {
              if (seg === customIconKey) {
                return iconKey
              }
            }
          }

          for (let seg of pathSegments) {
            for (const customIconKey of custom[customKey]) {
              if (seg === customIconKey) {
                return iconKey
              }
            }
          }
        }
      }
    }
  }

  return ''
}
