import { File } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

type SortFilesProps = 'label' | 'path';

export const sortFilesByProp =
  (prop: SortFilesProps) =>
  (a: File, b: File): number => {
    if (prop === 'label' || prop === 'path') {
      if (a && b && a.hasOwnProperty(prop) && b.hasOwnProperty(prop)) {
        const aVal = prop === 'label' ? a.searchLabel : String(a[prop]).toLowerCase();
        const bVal = prop === 'label' ? b.searchLabel : String(b[prop]).toLowerCase();

        if (aVal > bVal) {
          return 1;
        } else if (aVal < bVal) {
          return -1;
        }
      }
    }

    return 0;
  };
