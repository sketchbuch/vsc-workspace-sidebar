import { FS_WS_EXT } from '../../constants';

export const isWorkspacefile = (path: string, scheme: string) => {
  if (scheme === 'file' && path.substr(-FS_WS_EXT.length) === FS_WS_EXT) {
    return true;
  }

  return false;
};
