import * as os from 'os';
import * as pathLib from 'path';
import { workspace } from 'vscode';
import { CONFIG_FOLDER, FS_WS_EXT } from '../../../constants';
import { capitalise, isWorkspacefile } from '../../../utils';
import { File, WsFiles } from '../WorkspaceViewProvider.interface';
import { isSelected } from './isSelected';

export const convertWsFiles = (wsFiles: WsFiles, selected: string) => {
  const folder: string =
    workspace.getConfiguration().get('workspaceSidebar.folder') || CONFIG_FOLDER;
  const cleanedFolder = folder.replace(os.homedir(), '~');
  const convertedFiles = [...wsFiles]
    .filter((file) => isWorkspacefile(file, 'file'))
    .map(
      (file): File => {
        const lastFolder = file.lastIndexOf(pathLib.sep);
        const label = file
          .substring(lastFolder + 1)
          .replace(FS_WS_EXT, '')
          .toLowerCase()
          .replace(/[-|_]/g, ' ')
          .replace(/  +/g, ' ') // Multiple spaces to single
          .split(' ')
          .map((word) => capitalise(word))
          .join(' ');
        const path = file
          .substring(0, lastFolder)
          .replace(os.homedir(), '~')
          .replace(cleanedFolder, '')
          .replace(/^\//, ''); // Remove leading slash if there is one

        return {
          file,
          isSelected: isSelected(file, selected, process.platform),
          label,
          path,
          showPath: true,
        };
      }
    );

  return convertedFiles;
};
