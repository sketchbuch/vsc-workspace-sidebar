import { ThemeData, ThemeJsonIconDef } from '../../../theme/ThemeDataProcessor.interface'

interface CssProp {
  key: string
  value: string
}

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

const getCss = (iconName: string, iconDef: ThemeJsonIconDef) => {
  const cssProps = getCssProps(iconDef)

  return `.list file-icon.${iconName}-file-icon::before {
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

  console.log('### themeData', themeData)

  return `<style id="file-icon-css" media="screen" nonce="${nonce}" type="text/css">
    ${Object.keys(themeData.iconDefinitions)
      .map((def: string) => {
        return getCss(def, themeData.iconDefinitions[def])
      })
      .join('')}
  </style>`
}
