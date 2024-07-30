import { RenderVars } from '../../../webviews/webviews.interface'

export const workbenchJs = (nonce: string, { treeConfig }: RenderVars): string => {
  const { expandMode } = treeConfig

  return `<script nonce="${nonce}" id="wb-js">
    const wbExpand = "${expandMode}";
  </script>`
}
