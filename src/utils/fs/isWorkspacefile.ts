import * as pathLib from 'path';
import { FS_WS_FILETYPE } from '../../constants/fs';

export const isWorkspacefile = (path: string, scheme: string) => {
  if (scheme === 'file') {
    const lastSlashIndex = path.lastIndexOf(pathLib.sep);
    const fileName = path.substring(lastSlashIndex + 1);
    const [, ext] = fileName.split('.');

    if (ext && ext === FS_WS_FILETYPE) {
      return true;
    }
  }

  return false;
};
