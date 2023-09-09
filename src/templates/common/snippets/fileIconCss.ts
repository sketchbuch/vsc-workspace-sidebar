import {
  ThemeData,
  ThemeJsonIconDef,
  ThemeJsonMap,
} from '../../../theme/ThemeDataProcessor.interface'

interface CssProp {
  key: string
  value: string
}

type CssDefinition = string[]
type CssDefinitions = { [key: string]: CssDefinition }

export const getCssProps = (iconDef: ThemeJsonIconDef): CssProp[] => {
  const cssProps: CssProp[] = []

  if (iconDef.fontColor) {
    cssProps.push({ key: 'font-color', value: `${iconDef.fontColor}` })
  }

  if (iconDef.fontSize) {
    cssProps.push({ key: 'font-size', value: `${iconDef.fontSize}` })
  }

  if (iconDef.fontCharacter) {
    cssProps.push({ key: 'content', value: `'${iconDef.fontCharacter}'` })
  }

  if (iconDef.iconPath) {
    cssProps.push({ key: 'background-image', value: `url(${iconDef.iconPath})` })
  }

  return cssProps
}

const getCssDefinition = (
  classes: CssDefinition,
  key: string,
  cssPrefix: string,
  data?: ThemeJsonMap
): CssDefinition => {
  const newClasses = [...classes]

  if (data) {
    for (const [dataType, iconKey] of Object.entries(data)) {
      if (iconKey === key) {
        newClasses.push(`${cssPrefix}-${dataType}`)
      }
    }
  }

  return newClasses
}

const defaultBaseClass = 'file-icon'

const cssDefinitions = (themeData: ThemeData, baseClass: string): CssDefinitions => {
  const { iconDefinitions, fileExtensions, fileNames, languageIds } = themeData
  const defs: CssDefinitions = {}

  Object.keys(iconDefinitions).forEach((key) => {
    let classes: CssDefinition = []

    classes = getCssDefinition(classes, key, `.${baseClass}.${baseClass}-fileext`, fileExtensions)
    classes = getCssDefinition(classes, key, `.${baseClass}.${baseClass}-filename`, fileNames)
    classes = getCssDefinition(classes, key, `.${baseClass}.${baseClass}-lang`, languageIds)

    if (classes.length > 0) {
      defs[key] = classes
    }
  })

  return defs
}

const getCss = (iconDef: ThemeJsonIconDef, classes: CssDefinition) => {
  const cssProps = getCssProps(iconDef)

  return `${classes.join('::before, ')}::before {
      ${cssProps
        .map((prop) => {
          return `${prop.key}: ${prop.value};
          `
        })
        .join('')}
    }
  `
}

export const fileIconCss = (nonce: string, themeData: ThemeData | null): string => {
  if (themeData === null) {
    return ''
  }

  const defs = cssDefinitions(themeData, defaultBaseClass)

  return `<style id="file-icon-css" media="screen" nonce="${nonce}" type="text/css">
    ${Object.keys(defs)
      .map((def: string) => {
        return getCss(themeData.iconDefinitions[def], defs[def])
      })
      .join('')}
  </style>`
}
