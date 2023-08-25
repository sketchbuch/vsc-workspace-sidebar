import { SearchState } from '../../webviews/Workspace/WorkspaceViewProvider.interface'

export const getLabel = (label: string, search: SearchState): string => {
  const { caseInsensitive, matchStart, term } = search

  if (term) {
    const pattern = matchStart ? `^${term}` : term
    const flags = caseInsensitive ? 'gi' : 'g'
    const searchRegex = new RegExp(pattern, flags)

    return label.replace(searchRegex, '<mark>$&</mark>')
  }

  return label
}
