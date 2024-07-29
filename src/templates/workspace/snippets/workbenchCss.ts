import { RenderVars } from '../../../webviews/webviews.interface'

export const workbenchCss = (nonce: string, { treeConfig }: RenderVars): string => {
  const { indent } = treeConfig

  return `<style id="workbench-css" media="screen" nonce="${nonce}"  type="text/css">
    .list_branch-indent {width: ${indent}px;}
  </style>`
}
