import * as os from 'os';
import { workspace } from 'vscode';
import { CONFIG_PATHS_AS_NEEEDED, CONFIG_PATHS_NEVER, FS_WS_EXT } from '../../../constants';
import { capitalise } from '../../../utils';
import { File, WsFiles } from '../WorkspaceViewProvider.interface';

export const convertWsFiles = (wsFiles: WsFiles, selected: string) => {
  const showPaths: string =
    workspace.getConfiguration().get('workspaceSidebar.showPaths') || CONFIG_PATHS_NEVER;
  const folder: string = workspace.getConfiguration().get('workspaceSidebar.folder') || '';
  const cleanedFolder = folder.replace(os.homedir(), '~');
  const labels: string[] = [];
  const convertedFiles = wsFiles.map(
    (file): File => {
      const lastFolder = file.lastIndexOf('/');
      const label = file
        .substring(lastFolder + 1)
        .replace(FS_WS_EXT, '')
        .toLowerCase()
        .replace(/[-|_]/g, ' ')
        .replace(/  +/g, ' ') // Multiple spaces to single
        .split(' ')
        .map((word) => capitalise(word))
        .join(' ');
      const path =
        showPaths === CONFIG_PATHS_NEVER
          ? ''
          : file.substring(0, lastFolder).replace(os.homedir(), '~').replace(cleanedFolder, '…');

      labels.push(label);

      return {
        file,
        isSelected: file === selected,
        label,
        path,
      };
    }
  );

  if (showPaths === CONFIG_PATHS_AS_NEEEDED) {
    const findDuplicates = (arr: string[]) =>
      arr.filter((item, index) => arr.indexOf(item) !== index);

    const dups = findDuplicates(labels);

    convertedFiles.forEach((file: File) => {
      if (!dups.includes(file.label)) {
        file.path = '';
      }
    });
  }

  return convertedFiles;
};
