import { SearchState } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

export const getLabel = (label: string, search: SearchState): string => {
  const { caseInsensitive, term } = search;

  if (term) {
    const searchRegex = new RegExp(term, caseInsensitive ? 'gi' : 'g');
    return label.replace(searchRegex, '<mark>$&</mark>');
  }

  return label;
};
