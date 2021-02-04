import { File } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

export const sortFilesByLabel = (a: File, b: File): number => {
  if (a.hasOwnProperty('label') && b.hasOwnProperty('label')) {
    if (a.label.toLowerCase() > b.label.toLowerCase()) {
      return 1;
    } else if (a.label.toLowerCase() < b.label.toLowerCase()) {
      return -1;
    }
  }

  return 0;
};
