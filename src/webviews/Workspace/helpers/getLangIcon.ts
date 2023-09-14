import * as path from 'path'

interface IconMap {
  [key: string]: string[]
}

// Example custom matchers - move to config
const iconMap: IconMap = {
  dart: ['flutter'],
  java: ['ea'],
  javascript: ['js', 'gnome'],
  markdown: ['obsidian', 'review', 'sketchbuch'],
  python: ['py'],
  react: ['rjs'],
  typescript: ['deadfire', 'ts', 'vsc', 'vscode'],
  typescriptreact: ['electron', 'todo'],
  yaml: ['ansible'],
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

    iconSearch: for (const iconKey of allKeys) {
      const [themeKey, customMatch] = iconKey.split('###')
      const targetSeg = customMatch ?? themeKey

      for (let seg of nameSegments) {
        if (seg === targetSeg) {
          icon = themeKey
          break iconSearch
        }
      }

      for (let seg of pathSegments) {
        if (seg === targetSeg) {
          icon = themeKey
          break iconSearch
        }
      }
    }
  }

  return icon
}
