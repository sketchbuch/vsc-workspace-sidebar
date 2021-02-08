import { WsFiles } from '../..';
import { SortIds } from '../../../commands/registerCommands.interface';
import { sortFilesByLabel } from '../../../utils';
import { convertWsFiles } from '../helpers/convertWsFiles';

export const getVisibleFiles = (
  wsFiles: WsFiles,
  selected: string,
  search: string,
  sort: SortIds
) => {
  let visibleFiles = convertWsFiles(wsFiles, selected).sort(sortFilesByLabel);

  if (sort === 'descending') {
    visibleFiles.reverse();
  }

  if (search) {
    visibleFiles = visibleFiles.filter((file) => file.label.toLowerCase().includes(search));
  }

  return visibleFiles;
};
