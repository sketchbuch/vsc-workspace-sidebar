import { File, Files } from '../..';
import { SortIds } from '../../../commands/registerCommands';
import { getShowPathsConfig, getShowTreeConfig } from '../../../config/getConfig';
import { ConfigShowPaths } from '../../../constants';
import { findDuplicates, sortFilesByProp } from '../../../utils';

export const getVisibleFiles = (wsFiles: Files, search: string, sort: SortIds) => {
  const showTree = getShowTreeConfig();
  const showPaths = getShowPathsConfig();
  let visibleFiles = [...wsFiles];

  if (search) {
    // TODO - Maybe store the lowercased value in converted files?
    visibleFiles = visibleFiles.filter((file) => file.label.toLowerCase().includes(search));
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
