import { workspace } from 'vscode';
import { File, Files } from '../..';
import { SortIds } from '../../../commands/registerCommands.interface';
import { ConfigShowPaths } from '../../../constants';
import { findDuplicates, sortFilesByLabel } from '../../../utils';

export const getVisibleFiles = (wsFiles: Files, search: string, sort: SortIds) => {
  const showPaths: string =
    workspace.getConfiguration().get('workspaceSidebar.showPaths') || ConfigShowPaths.NEVER;
  let visibleFiles = [...wsFiles];

  if (search) {
    visibleFiles = visibleFiles.filter((file) => file.label.toLowerCase().includes(search));
  }

  visibleFiles.sort(sortFilesByLabel);

  if (sort === 'descending') {
    visibleFiles.reverse();
  }

  if (showPaths === ConfigShowPaths.AS_NEEEDED) {
    const labels = visibleFiles.map((file) => file.label);
    const dups = findDuplicates(labels);

    visibleFiles.forEach((file: File) => {
      if (!dups.includes(file.label)) {
        file.path = '';
      }
    });
  } else if (showPaths === ConfigShowPaths.NEVER) {
    visibleFiles = visibleFiles.map(
      (file): File => {
        return { ...file, path: '' };
      }
    );
  }

  return visibleFiles;
};
