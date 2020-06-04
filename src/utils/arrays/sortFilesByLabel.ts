import { File } from '../../treeviews/WsList/WsList.interface';

export const sortFilesByLabel = (a: File, b: File): number => {
  if (a.label.toLowerCase() > b.label.toLowerCase()) {
    return 1;
  }

  return -1;
};
