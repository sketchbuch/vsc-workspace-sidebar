import * as os from 'os';
import { workspace } from 'vscode';
import { FS_WS_EXT } from '../../../constants';
import { capitalise } from '../../../utils';
import { File, WsFiles } from '../WorkspaceViewProvider.interface';

export const convertWsFiles = (wsFiles: WsFiles) => {
  const showPath: boolean = workspace.getConfiguration().get('workspaceSidebar.showPath') || false;
  const folder: string = workspace.getConfiguration().get('workspaceSidebar.folder') || '';
  const cleanedFolder = folder.replace(os.homedir(), '~');

  return wsFiles.map(
    (file): File => {
      const lastFolder = file.lastIndexOf('/');
      const label = file.substring(lastFolder + 1).replace(FS_WS_EXT, '');
      const path = showPath
        ? file.substring(0, lastFolder).replace(os.homedir(), '~').replace(cleanedFolder, '…')
        : '';

      return {
        file,
        label: label
          .toLowerCase()
          .replace(/[-|_]/g, ' ')
          .replace(/  +/g, ' ') // Multiple spaces to single
          .split(' ')
          .map((word) => capitalise(word))
          .join(' '),
        path,
      };
    }
  );
};
