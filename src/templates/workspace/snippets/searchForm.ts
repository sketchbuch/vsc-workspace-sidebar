import { WorkspaceState } from '../../../webviews/Workspace/WorkspaceViewProvider.interface'
import { searchBox } from './searchBox'

export const searchForm = (state: WorkspaceState): string => {
  return `
    <section role="search" class="list__search">
      ${searchBox(state)}
    </section>
  `
}
