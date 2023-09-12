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

export const getLangIcon = (file: string, fileIconKeys: string[]): string => {
  const pathSegments = file.toLowerCase().split(path.sep)
  const fileName = pathSegments.pop()
  const filePath = pathSegments.join(path.sep)

  let icon = ''

  for (const [lang, langStrgs] of Object.entries(iconMap)) {
    if (icon) {
      break
    }

    for (const langStrIndex in langStrgs) {
      const inName = !!fileName?.includes(langStrgs[langStrIndex])
      const inPath = !!filePath?.includes(langStrgs[langStrIndex])

      if (inName) {
        icon = lang
        break
      } else if (inPath) {
        icon = lang
        break
      }
    }
  }

  return icon
}
