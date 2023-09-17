import * as vscode from 'vscode'
import {
  GetThemeData,
  ThemeData,
  ThemeFontDefinition,
  ThemeJsonIconDef,
  ThemeJsonIconMap,
} from '../../../theme/ThemeProcessor.interface'

interface CssProp {
  key: string
  value: string
}

type CssDefinition = string[]
type CssDefinitions = { [key: string]: CssDefinition }

export const getCssProps = (
  iconDef: ThemeJsonIconDef,
  webview: vscode.Webview,
  showLanguageModeIcons: boolean,
  fonts: ThemeFontDefinition[]
): CssProp[] => {
  const cssProps: CssProp[] = []

  if (iconDef.iconPath) {
    cssProps.push({
      key: 'background-image',
      value: `url(${webview.asWebviewUri(vscode.Uri.file(iconDef.iconPath))})`,
    })
    cssProps.push({ key: 'content', value: '" "' })
  } else if (iconDef.fontCharacter || iconDef.fontColor) {
    if (iconDef.fontColor) {
      cssProps.push({ key: 'color', value: `${iconDef.fontColor}` })
    }

    if (iconDef.fontCharacter) {
      cssProps.push({ key: 'content', value: `'${iconDef.fontCharacter}'` })
    }

    const fontId = iconDef.fontId
    let fontSize = iconDef.fontSize

    if (fontId) {
      cssProps.push({ key: 'font-family', value: `${fontId}` })

      const fontDefinition = fonts.find((font) => (font.id = fontId))

      if (fontDefinition) {
        fontSize = fontDefinition.size ?? '150%'
      }
    }

    if (fontSize) {
      cssProps.push({ key: 'font-size', value: `${fontSize}` })
    }

    if (showLanguageModeIcons) {
      cssProps.push({
        key: 'background-image',
        value: 'unset',
      })
    }
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
        const cleanedType = dataType
          .replace(/\./g, '-')
          .replace(/\//g, '-')
          .replace(/\++/g, 'pp')
          .replace(/#/g, 'h')

        const newClass = `.${baseClass}.${baseClass}-lang-${cleanedType}`

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

    // Default file from theme
    if (key === file && !defaultFileAdded) {
      classes.push(`.${baseClass}.${baseClass}-lang-file`)
      defaultFileAdded = true
    }

    if (classes.length > 0) {
      defs[key] = classes
    }
  })

  return defs
}

const getCss = (
  iconDef: ThemeJsonIconDef,
  classes: CssDefinition,
  webview: vscode.Webview,
  showLanguageModeIcons: boolean,
  fonts: ThemeFontDefinition[]
) => {
  const cssProps = getCssProps(iconDef, webview, showLanguageModeIcons, fonts)

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
export const getFontCss = (themeData: ThemeData, webview: vscode.Webview): string => {
  if (themeData.fonts.length > 0) {
    return themeData.fonts
      .map((font): string => {
        const src = font.src
          .map(
            (fontSrc) =>
              `url('${webview.asWebviewUri(vscode.Uri.file(fontSrc.path))}') format('${
                fontSrc.format
              }')`
          )
          .join(', ')

        return `@font-face { font-family: '${font.id}'; src: ${src}; font-weight: ${font.weight}; font-style: ${font.style}; font-display: block; }\n`
      })
      .join('\n')
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

  defKeys.reverse()

  return `<style id="file-icon-css" media="screen" nonce="${nonce}" data-defcount="${
    defKeys.length
  }" data-themeid="${themeId}"  type="text/css">
    ${getFontCss(data, webview)}

    ${defKeys
      .map((def: string) => {
        return getCss(
          data.iconDefinitions[def],
          defs[def],
          webview,
          !!themeData.data?.showLanguageModeIcons,
          data.fonts
        )
      })
      .join('')}
  </style>`
}
