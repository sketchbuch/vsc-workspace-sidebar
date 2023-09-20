import * as vscode from 'vscode'
import {
  ThemeFontDefinition,
  ThemeJson,
  ThemeJsonIconDef,
  ThemeJsonIconMap,
} from '../ThemeProcessor.interface'
import { cleanFileIconKey } from '../utils/strings/cleanFileIconKey'
import {
  CssDefinition,
  CssDefinitions,
  CssGeneratorInterface,
  CssProp,
  ProcessedCss,
} from './CssGenerator.interface'

export class CssGenerator implements CssGeneratorInterface {
  constructor(private _webview: vscode.Webview, private _baseClass: string = 'file-icon') {}

  private getCss(
    iconDef: ThemeJsonIconDef,
    classes: CssDefinition,
    showLanguageModeIcons: boolean,
    fonts: ThemeFontDefinition[]
  ) {
    const cssProps = this.getCssProps(iconDef, showLanguageModeIcons, fonts)

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

  private getCssDefinition(
    classes: CssDefinition,
    key: string,
    type: string,
    data?: ThemeJsonIconMap
  ): CssDefinition {
    const newClasses = [...classes]

    if (data) {
      for (const [dataType, iconKey] of Object.entries(data)) {
        if (iconKey === key) {
          const cleanedIconKey = cleanFileIconKey(dataType)

          const newClass = `.${this._baseClass}.${this._baseClass}-lang-${cleanedIconKey}`

          if (!newClasses.includes(newClass)) {
            newClasses.push(newClass)
          }
        }
      }
    }

    return newClasses
  }

  private getCssProps(
    iconDef: ThemeJsonIconDef,
    showLanguageModeIcons: boolean,
    fonts: ThemeFontDefinition[]
  ): CssProp[] {
    const cssProps: CssProp[] = []

    if (iconDef.iconPath) {
      cssProps.push({
        key: 'background-image',
        value: `url(${this._webview.asWebviewUri(vscode.Uri.file(iconDef.iconPath))})`,
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

  private getFontCss(themeData: ThemeJson): string {
    if (themeData.fonts.length > 0) {
      return themeData.fonts
        .map((font): string => {
          const src = font.src
            .map(
              (fontSrc) =>
                `url('${this._webview.asWebviewUri(vscode.Uri.file(fontSrc.path))}') format('${
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

  private cssDefinitions(themeData: ThemeJson) {
    const { file, iconDefinitions, fileExtensions, fileNames, languageIds } = themeData
    const defs: CssDefinitions = {}
    let defaultFileAdded = false

    Object.keys(iconDefinitions).forEach((key) => {
      let classes: CssDefinition = []

      classes = this.getCssDefinition(classes, key, 'ext', fileExtensions)
      classes = this.getCssDefinition(classes, key, 'name', fileNames)
      classes = this.getCssDefinition(classes, key, 'lang', languageIds)

      // Default file from theme
      if (key === file && !defaultFileAdded) {
        classes.push(`.${this._baseClass}.${this._baseClass}-lang-file`)
        defaultFileAdded = true
      }

      if (classes.length > 0) {
        defs[key] = classes
      }
    })

    return defs
  }

  public processCss(themeData: ThemeJson): ProcessedCss {
    const defs = this.cssDefinitions(themeData)
    const defKeys = Object.keys(defs)
    const fontCss = this.getFontCss(themeData)
    const iconCss = defKeys.map((def: string) => {
      return this.getCss(
        themeData.iconDefinitions[def],
        defs[def],
        !!themeData?.showLanguageModeIcons,
        themeData.fonts
      )
    })

    return {
      defCount: defKeys.length,
      fontCss,
      iconCss,
    }
  }
}
