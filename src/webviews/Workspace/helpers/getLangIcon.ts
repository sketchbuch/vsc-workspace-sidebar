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

export const getLangIcon = (file: string): string => {
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
