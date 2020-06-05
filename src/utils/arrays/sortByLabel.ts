export interface SortFilesByLabel {
  [key: string]: string;
}

export const sortByLabel = (a: SortFilesByLabel, b: SortFilesByLabel): number => {
  if (a.hasOwnProperty('label') && b.hasOwnProperty('label')) {
    if (a.label.toLowerCase() > b.label.toLowerCase()) {
      return 1;
    }
  }

  return -1;
};
