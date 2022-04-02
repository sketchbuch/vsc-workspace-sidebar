import { FileTree } from '../../webviews/Workspace/helpers/getFileTree';
import { File } from '../../webviews/Workspace/WorkspaceViewProvider.interface';

type TreeChild = FileTree | File;
export type TreeChildren = TreeChild[];

export const sortTreeChildren = (childen: TreeChildren): TreeChildren => {
  if (childen.length > 1) {
    return childen.sort((a, b) => {
      if (a && b) {
        const aVal = a.searchLabel;
        const bVal = b.searchLabel;

        if (aVal > bVal) {
          return 1;
        } else if (aVal < bVal) {
          return -1;
        }
      }

      return 0;
    });
  }

  return childen;
};
