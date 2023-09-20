import * as vscode from 'vscode'
import { CssGenerator } from '../../../themeNpm/CssGenerator/CssGenerator'
import { GetThemeData } from '../../../themeNpm/ThemeProcessor.interface'

export const fileIconCss = (
  nonce: string,
  themeData: GetThemeData | null,
  webview: vscode.Webview
): string => {
  if (themeData === null || themeData.state !== 'data-ready' || themeData.data === null) {
    return ''
  }

  const { data, themeId } = themeData

  const cssGenerator = new CssGenerator(webview)
  const { defCount, fontCss, iconCss } = cssGenerator.processCss(data)

  return `<style id="file-icon-css" media="screen" nonce="${nonce}" data-defcount="${defCount}" data-themeid="${themeId}"  type="text/css">
    ${fontCss}
    ${iconCss.join('')}
  </style>`
}
