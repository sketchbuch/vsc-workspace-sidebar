import { t } from 'vscode-ext-localisation'
import { viewMsg } from '../../common/snippets/viewMsg'

export const searchNoMatches = (): string => {
  return `
    <div class="rootfolder__message" data-type="searched-out">
      ${viewMsg({
        message: t('workspace.list.search.noMatch'),
        iconType: 'search',
        type: 'title',
      })}
    </div>
  `
}
