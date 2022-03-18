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

export const sortFilesByFile = (a: File, b: File): number => {
  if (a.hasOwnProperty('path') && b.hasOwnProperty('path')) {
    if (a.path.toLowerCase() > b.path.toLowerCase()) {
      return 1;
    } else if (a.path.toLowerCase() < b.path.toLowerCase()) {
      return -1;
    }
  }

  return 0;
};

export const sortFilesByProp = (prop: 'label' | 'file') => (a: File, b: File): number => {
  if (prop === 'label' || prop === 'file') {
    if (a.hasOwnProperty(prop) && b.hasOwnProperty(prop)) {
      const aVal = String(a[prop]).toLowerCase();
      const bVal = String(b[prop]).toLowerCase();

      if (aVal > bVal) {
        return 1;
      } else if (aVal < bVal) {
        return -1;
      }
    }
  }

  return 0;
};
