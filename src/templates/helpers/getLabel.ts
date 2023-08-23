export const getLabel = (label: string, search: string) => {
  if (search) {
    const searchRegex = new RegExp(search, 'gi');
    return label.replace(searchRegex, '<mark class="searchMatch">$&</mark>');
  }

  return label;
};
