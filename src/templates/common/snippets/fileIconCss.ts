import { ThemeData } from '../../../theme/ThemeDataProcessor.interface'

export const fileIconCss = (nonce: string, themeData: ThemeData | null): string => {
  console.log('### themeData', themeData)

  if (themeData === null) {
    return ''
  }

  return `<style id="file-icon-css" media="screen" nonce="${nonce}" type="text/css"></style>`
}
