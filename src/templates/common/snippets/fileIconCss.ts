import * as vscode from 'vscode'
import { CssData } from '../../../themeNpm/CssGenerator/CssGenerator.interface'
import { GetThemeData } from '../../../themeNpm/FileThemeProcessor/FileThemeProcessor.interface'

export const fileIconCss = (
  nonce: string,
  themeData: GetThemeData | null,
  cssData: CssData | null,
  webview: vscode.Webview
): string => {
  if (
    themeData === null ||
    themeData.state !== 'ready' ||
    themeData.data === null ||
    themeData.themeId === null ||
    !cssData
  ) {
    return ''
  }

  const { themeId } = themeData
  const { defCount, fontFaceCss, iconCss } = cssData

  return `<style id="file-icon-css" media="screen" nonce="${nonce}" data-defcount="${defCount}" data-themeid="${themeId}"  type="text/css">
    ${fontFaceCss}
    ${iconCss}
  </style>`
}
