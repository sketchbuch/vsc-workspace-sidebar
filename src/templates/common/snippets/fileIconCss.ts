import * as vscode from 'vscode'
import {
  GetThemeData,
  ThemeData,
  ThemeJsonIconDef,
  ThemeJsonIconMap,
} from '../../../theme/ThemeProcessor.interface'

interface CssProp {
  key: string
  value: string
}

type CssDefinition = string[]
type CssDefinitions = { [key: string]: CssDefinition }

export const getCssProps = (iconDef: ThemeJsonIconDef, webview: vscode.Webview): CssProp[] => {
  const cssProps: CssProp[] = []

  if (iconDef.fontColor) {
    cssProps.push({ key: 'color', value: `${iconDef.fontColor}` })
  }

  if (iconDef.fontSize) {
    cssProps.push({ key: 'font-size', value: `${iconDef.fontSize}` })
  }

  if (iconDef.fontCharacter) {
    cssProps.push({ key: 'content', value: `'${iconDef.fontCharacter}'` })
  }

  if (iconDef.iconPath) {
    cssProps.push({
      key: 'background-image',
      value: `url(${webview.asWebviewUri(vscode.Uri.file(iconDef.iconPath))})`,
    })
    cssProps.push({ key: 'content', value: '" "' })
  } else {
    cssProps.push({
      key: 'background-image',
      value: 'unset',
    })
  }

  return cssProps
}

const getCssDefinition = (
  classes: CssDefinition,
  key: string,
  baseClass: string,
  data?: ThemeJsonIconMap
): CssDefinition => {
  const newClasses = [...classes]

  if (data) {
    for (const [dataType, iconKey] of Object.entries(data)) {
      if (iconKey === key) {
        const newClass = `.${baseClass}.${baseClass}-lang-${dataType
          .replace(/\./g, '-')
          .replace(/\//g, '-')}`

        if (!newClasses.includes(newClass)) {
          newClasses.push(newClass)
        }
      }
    }
  }

  return newClasses
}

const defaultBaseClass = 'file-icon'

const cssDefinitions = (themeData: ThemeData, baseClass: string): CssDefinitions => {
  const { file, iconDefinitions, fileExtensions, fileNames, languageIds } = themeData
  const defs: CssDefinitions = {}
  let defaultFileAdded = false

  Object.keys(iconDefinitions).forEach((key) => {
    let classes: CssDefinition = []

    classes = getCssDefinition(classes, key, baseClass, fileExtensions)
    classes = getCssDefinition(classes, key, baseClass, fileNames)
    classes = getCssDefinition(classes, key, baseClass, languageIds)

    if (key === file && !defaultFileAdded) {
      classes.push(`.${baseClass}.${baseClass}-lang-file`)
      defaultFileAdded = true
    }

    if (classes.length > 0) {
      defs[key] = classes
    }
  })

  console.log('### defs', defs)

  return defs
}

const getCss = (iconDef: ThemeJsonIconDef, classes: CssDefinition, webview: vscode.Webview) => {
  const cssProps = getCssProps(iconDef, webview)

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
/* panel.webview.asWebviewUri(vscode.Uri.file(
  path.join(extensionPath, "out", "fonts", "font.ttf")
)); */
export const getFontCss = (
  themeData: ThemeData,
  baseClass: string,
  webview: vscode.Webview
): string => {
  if (themeData.fonts.length > 0) {
    const fontData = themeData.fonts[0]

    return `@font-face {
        font-family: '${fontData.id}';
        src: url('${webview.asWebviewUri(
          vscode.Uri.file(fontData.src[0].path)
        )}') format('truetype');
    }

   .${baseClass} {
      font-family: '${fontData.id}';
      font-size: ${fontData.size ?? 'medium'};
      font-style: ${fontData.style ?? 'normal'};
      font-weight: ${fontData.weight ?? 'normal'};
    }
    `
  }

  return ''
}

export const fileIconCss = (
  nonce: string,
  themeData: GetThemeData | null,
  webview: vscode.Webview
): string => {
  if (themeData === null || themeData.state !== 'data-ready' || themeData.data === null) {
    return ''
  }

  const { data, themeId } = themeData

  const defs = cssDefinitions(data, defaultBaseClass)
  const defKeys = Object.keys(defs)

  return `<style id="file-icon-css" media="screen" nonce="${nonce}" data-defcount="${
    defKeys.length
  }" data-themeid="${themeId}"  type="text/css">
    ${getFontCss(data, defaultBaseClass, webview)}

    ${defKeys
      .map((def: string) => {
        return getCss(data.iconDefinitions[def], defs[def], webview)
      })
      .join('')}
  </style>`
}
