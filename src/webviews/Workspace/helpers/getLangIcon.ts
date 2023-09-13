import * as path from 'path'

interface IconMap {
  [key: string]: string[]
}

const iconMap: IconMap = {
  dart: ['flutter'],
  javascript: ['js'],
  python: ['py'],
  react: ['rjs'],
  typescript: ['ts', 'vsc', 'deadfire'],
  yml: ['ansible'],
}

let iconMapFlat: string[] = []

for (const themeKey of Object.keys(iconMap)) {
  const customMatches = iconMap[themeKey]

  for (const match of customMatches) {
    iconMapFlat.push(`${themeKey}###${match}`)
  }
}

export const getLangIconNew = (file: string, fileIconKeys: string[]): string => {
  const allKeys = [...iconMapFlat, ...fileIconKeys]
  let icon = ''

  if (allKeys.length > 0) {
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

    for (const iconKey of allKeys) {
      if (icon) {
        break
      }

      const [themeKey, customMatch] = iconKey.split('###')
      const targetSeg = customMatch ?? themeKey

      for (let seg of nameSegments) {
        if (seg === targetSeg) {
          icon = themeKey
          break
        }
      }

      if (icon) {
        break
      }

      for (let seg of pathSegments) {
        if (seg === targetSeg) {
          icon = themeKey
          break
        }
      }
    }
  }

  return icon
}
