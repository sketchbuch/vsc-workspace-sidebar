import * as vscode from 'vscode'
import { CssGenerator } from '../../../themeNpm/CssGenerator/CssGenerator'
import { GetThemeData } from '../../../themeNpm/FileThemeProcessor.interface'

export const fileIconCss = (
  nonce: string,
  themeData: GetThemeData | null,
  webview: vscode.Webview
): string => {
  if (
    themeData === null ||
    themeData.state !== 'ready' ||
    themeData.data === null ||
    themeData.themeId === null
  ) {
    return ''
  }

  const { data, themeId } = themeData

  const cssGenerator = new CssGenerator(webview)
  const { defCount, fontFaceCss, iconCss } = cssGenerator.getCss(data, themeId)

  return `<style id="file-icon-css" media="screen" nonce="${nonce}" data-defcount="${defCount}" data-themeid="${themeId}"  type="text/css">
    ${fontFaceCss}
    ${iconCss}
  </style>`
}
