import * as path from 'path'

interface IconMap {
  [key: string]: string[]
}

const iconMap: IconMap = {
  flutter: ['flutter'],
  javascript: ['javascript', 'js'],
  php: ['php'],
  python: ['python', 'py'],
  react: ['react', 'rjs'],
  typescript: ['typescript', 'ts', 'tsx'],
}

export const getLangIconNew = (file: string, fileIconKeys: string[]): string => {
  let icon = ''

  if (fileIconKeys.length > 0) {
    const { dir, name } = path.parse(file)

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

    for (const iconKey of fileIconKeys) {
      if (icon) {
        break
      }

      for (let seg of nameSegments) {
        if (seg === iconKey) {
          icon = iconKey
          break
        }
      }

      if (icon) {
        break
      }

      for (let seg of pathSegments) {
        if (seg === iconKey) {
          icon = iconKey
          break
        }
      }
    }
  }

  return icon
}
