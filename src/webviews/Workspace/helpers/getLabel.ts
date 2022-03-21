import { FS_WS_EXT } from '../../../constants/fs';
import { capitalise } from './capitalise';

export const getLabel = (wsFile: string, clean: boolean, lastSlashIndex: number): string => {
  const label = wsFile.substring(lastSlashIndex + 1).replace(FS_WS_EXT, '');

  if (clean) {
    return label
      .toLowerCase()
      .replace(/[-|_]/g, ' ')
      .replace(/  +/g, ' ') // Multiple spaces to single
      .split(' ')
      .map((word) => capitalise(word))
      .join(' ');
  }

  return label;
};
