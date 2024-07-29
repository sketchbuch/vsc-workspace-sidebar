import { t } from 'vscode-ext-localisation'
import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { searchOption } from './searchOption'

export const searchBox = (state: WorkspaceState): string => {
  const allLoading = state.rootFolders.every((rf) => rf.result === 'loading')

  return `
    <div class="searchBox">
      <vscode-text-field
        aria-label="${t('workspace.list.search.ariaLabel')}"
        id="searchWorkspaces"
        placeholder="${t('workspace.list.search.placeholder')}"
        type="text"
        value="${state.search.term}"
        ${allLoading ? 'disabled' : ''}
        >
        <section aria-label="${t(
          'workspace.list.search.optionsLegend'
        )}" class="searchBox__options-section" slot="end">
          ${searchOption(
            'matchStart',
            state.search.matchStart,
            t('workspace.list.search.options.matchStart'),
            'export'
          )}
          ${searchOption(
            'caseInsensitive',
            state.search.caseInsensitive,
            t('workspace.list.search.options.caseInsensitive'),
            'case-sensitive'
          )}
        </section>
      </vscode-text-field>
    </div>
  `
}
