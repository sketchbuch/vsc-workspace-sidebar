import { CssData, GetThemeData } from 'vscode-file-theme-processor'

export const fileIconCss = (
  nonce: string,
  themeData: GetThemeData | null,
  cssData: CssData | null
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
