import { FS_WS_EXT } from '../../../constants/fs';
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment';
import { capitalise } from './capitalise';

export const getLabel = (wsFile: string, clean: boolean): string => {
  const label = getLastPathSegment(wsFile).replace(FS_WS_EXT, '');

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
