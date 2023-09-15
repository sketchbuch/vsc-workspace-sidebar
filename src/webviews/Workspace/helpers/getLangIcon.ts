import * as path from 'path'
import { FileIconKeys } from '../../webviews.interface'

export const getLangIconNew = (file: string, fileIconKeys: FileIconKeys): string => {
  const { custom, fileExtensions, languageIds } = fileIconKeys
  const { dir, name } = path.parse(file)
  let fallback = fileIconKeys.file ? 'file' : ''

  const nameSegments = name
    .toLowerCase()
    // Normalise keyword seperators
    .replace(' ', '.')
    .replace('_', '.')
    .replace('-', '.')
    .split('.')

  const pathSegments = dir
    .toLowerCase()
    .split(path.sep)
    .filter((seg) => seg)
    .reverse() // Prioritise deepest folders

  if (fileExtensions) {
    for (const iconKey of fileExtensions) {
      if (iconKey === 'workspace') {
        fallback = iconKey
      }

      for (let seg of nameSegments) {
        if (seg === iconKey) {
          return iconKey
        }
      }

      for (let seg of pathSegments) {
        if (seg === iconKey) {
          return iconKey
        }
      }

      if (custom) {
        const customKeys = Object.keys(custom)

        for (const customKey of customKeys) {
          if (customKey === iconKey) {
            for (const customIconKey of custom[customKey]) {
              for (let seg of nameSegments) {
                if (seg === customIconKey) {
                  return iconKey
                }
              }

              for (let seg of pathSegments) {
                if (seg === customIconKey) {
                  return iconKey
                }
              }
            }
          }
        }
      }
    }
  }

  if (languageIds) {
    for (const iconKey of languageIds) {
      if (iconKey === 'workspace') {
        fallback = iconKey
      }

      for (let seg of nameSegments) {
        if (seg === iconKey) {
          return iconKey
        }
      }

      for (let seg of pathSegments) {
        if (seg === iconKey) {
          return iconKey
        }
      }

      if (custom) {
        const customKeys = Object.keys(custom)

        for (const customKey of customKeys) {
          if (customKey === iconKey) {
            for (const customIconKey of custom[customKey]) {
              for (let seg of nameSegments) {
                if (seg === customIconKey) {
                  return iconKey
                }
              }

              for (let seg of pathSegments) {
                if (seg === customIconKey) {
                  return iconKey
                }
              }
            }
          }
        }
      }
    }
  }

  return fallback
}
