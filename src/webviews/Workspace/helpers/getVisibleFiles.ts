import { SortIds } from '../../../commands/registerCommands';
import { getShowPathsConfig, getShowTreeConfig } from '../../../config/getConfig';
import { ConfigShowPaths } from '../../../constants/config';
import { sortFilesByProp } from '../../../utils/arrays/sortFilesByProp';
import { File, Files } from '../WorkspaceViewProvider.interface';
import { findDuplicates } from './findDuplicates';

export const getVisibleFiles = (wsFiles: Files, search: string, sort: SortIds) => {
  const showTree = getShowTreeConfig();
  const showPaths = getShowPathsConfig();
  let visibleFiles = [...wsFiles];

  if (search) {
    visibleFiles = visibleFiles.filter((file) => file.searchLabel.includes(search));
  }

  if (!showTree) {
    visibleFiles.sort(sortFilesByProp('label'));

    if (sort === 'descending') {
      visibleFiles.reverse();
    }
  }

  if (showPaths === ConfigShowPaths.AS_NEEEDED) {
    const labels = visibleFiles.map((file) => file.label);
    const dups = findDuplicates(labels);

    visibleFiles = visibleFiles.map((file: File) => {
      if (!dups.includes(file.label)) {
        return { ...file, showPath: false };
      }

      return file;
    });
  } else if (showPaths === ConfigShowPaths.NEVER) {
    visibleFiles = visibleFiles.map(
      (file): File => {
        return { ...file, showPath: false };
      }
    );
  }

  return visibleFiles;
};
