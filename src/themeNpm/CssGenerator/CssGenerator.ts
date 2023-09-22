import * as vscode from 'vscode'
import {
  ThemeFontDefinition,
  ThemeJson,
  ThemeJsonIconDef,
  ThemeJsonIconMap,
  ThemeJsonIconSingle,
} from '../FileThemeProcessor/FileThemeProcessor.interface'
import { cleanFileIconKey } from '../utils/strings/cleanFileIconKey'
import { CssCache, CssData, CssDefinition, CssDefinitions, CssProp } from './CssGenerator.interface'

export class CssGenerator {
  private readonly _baseClass: string = 'file-icon'
  private _webview?: vscode.Webview
  private readonly _sessionCache: CssCache = {}

  constructor() {}

  private getCssData(themeId: string): CssData | null {
    if (this._sessionCache[themeId]) {
      return this._sessionCache[themeId]
    }

    return null
  }

  private setCssData(themeId: string, data: CssData): void {
    this._sessionCache[themeId] = data
  }

  private getClass(iconKey: string): string {
    const cleanedIconKey = cleanFileIconKey(iconKey)

    return `.${this._baseClass}.${this._baseClass}-type-${cleanedIconKey}`
  }

  private getClasses(
    iconDef: ThemeJsonIconDef,
    classes: CssDefinition,
    showLanguageModeIcons: boolean,
    fonts: ThemeFontDefinition[]
  ) {
    const cssProps = this.getProps(iconDef, showLanguageModeIcons, fonts)

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

  private getDefinition(
    classes: CssDefinition,
    key: string,
    data?: ThemeJsonIconMap
  ): CssDefinition {
    const newClasses = [...classes]

    if (data) {
      for (const [dataType, iconKey] of Object.entries(data)) {
        if (iconKey === key) {
          const newClass = this.getClass(dataType)

          if (!newClasses.includes(newClass)) {
            newClasses.push(newClass)
          }
        }
      }
    }

    return newClasses
  }

  private getDefinitions(themeData: ThemeJson) {
    const {
      file,
      fileExtensions,
      fileNames,
      folder,
      folderExpanded,
      folderNames,
      folderNamesExpanded,
      iconDefinitions,
      languageIds,
      rootFolder,
      rootFolderExpanded,
    } = themeData
    const defs: CssDefinitions = {}
    const singleIcons: { icon: string; value: ThemeJsonIconSingle }[] = [
      { icon: 'file', value: file },
      { icon: 'folder', value: folder },
      { icon: 'folderExpanded', value: folderExpanded },
      { icon: 'rootFolder', value: rootFolder },
      { icon: 'rootFolderExpanded', value: rootFolderExpanded },
    ]

    Object.keys(iconDefinitions).forEach((key) => {
      let classes: CssDefinition = []

      classes = this.getDefinition(classes, key, fileExtensions)
      classes = this.getDefinition(classes, key, fileNames)
      classes = this.getDefinition(classes, key, languageIds)
      classes = this.getDefinition(classes, key, folderNames)
      classes = this.getDefinition(classes, key, folderNamesExpanded)

      singleIcons.forEach((singleIcon) => {
        const { icon, value } = singleIcon

        if (key === value) {
          const singleClass = this.getClass(icon)

          if (!classes.includes(singleClass)) {
            classes.push(singleClass)
          }
        }
      })

      if (classes.length > 0) {
        defs[key] = classes
      }
    })

    return defs
  }

  private getFontFace(themeData: ThemeJson): string {
    if (themeData.fonts.length > 0) {
      return themeData.fonts
        .map((font): string => {
          const src = font.src
            .map(
              (fontSrc) =>
                `url('${this._webview?.asWebviewUri(vscode.Uri.file(fontSrc.path))}') format('${
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

  private getProps(
    iconDef: ThemeJsonIconDef,
    showLanguageModeIcons: boolean,
    fonts: ThemeFontDefinition[]
  ): CssProp[] {
    const cssProps: CssProp[] = []

    if (iconDef.iconPath) {
      cssProps.push({
        key: 'background-image',
        value: `url(${this._webview?.asWebviewUri(vscode.Uri.file(iconDef.iconPath))})`,
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

  private processCss(themeData: ThemeJson, themeId: string): CssData {
    const defs = this.getDefinitions(themeData)
    const defKeys = Object.keys(defs)

    const cssData: CssData = {
      defCount: defKeys.length,
      fontFaceCss: this.getFontFace(themeData),
      iconCss: defKeys
        .map((def: string) => {
          return this.getClasses(
            themeData.iconDefinitions[def],
            defs[def],
            !!themeData?.showLanguageModeIcons,
            themeData.fonts
          )
        })
        .join('\n'),
    }

    this.setCssData(themeId, cssData)

    return cssData
  }

  public getCss(themeData: ThemeJson, themeId: string, webview: vscode.Webview): CssData {
    this._webview = webview

    const cacheData = this.getCssData(themeId)

    if (cacheData) {
      return cacheData
    }

    return this.processCss(themeData, themeId)
  }
}
