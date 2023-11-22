import { cleanFileIconKey } from 'vscode-file-theme-processor'
import { RenderVars } from '../../../webviews/webviews.interface'
import { getImgUrls } from '../../getImgUrls'

export const itemIconClosed = (): string => {
  return `
      <div class="list_branch-icon codicon codicon-chevron-right"></div>
    `
}

export const itemIconDummy = (): string => {
  return `
      <div class="list_branch-icon list_branch-icon-empty"></div>
    `
}

export const itemIconFile = (): string => {
  return `
      <div class="list_branch-icon codicon codicon-record-small"></div>
    `
}

export const itemIconFiletheme = (icon: string): string => {
  return `
      <div class="list_branch-icon file-icon file-icon-type-${cleanFileIconKey(icon)}"></div>
    `
}

export const itemIconOpen = (): string => {
  return `
      <div class="list_branch-icon codicon codicon-chevron-down"></div>
    `
}

export const itemIconSelected = (renderVars: RenderVars): string => {
  const { dark, light } = getImgUrls(renderVars, 'check')

  return `
    <span class="view__icon list__icon">
      <img alt="" data-theme="dark" src="${dark}" />
      <img alt="" data-theme="light" src="${light}" />
    </span>
  `
}
