import { ViewLinkType } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'

export const viewLink = (text: string, linkType: ViewLinkType): string => {
  return `<a class="view__link" data-type="${linkType}">${text}</a>`
}
