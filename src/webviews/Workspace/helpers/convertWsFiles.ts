import * as os from 'os';
import * as pathLib from 'path';
import { workspace } from 'vscode';
import { ConfigShowPaths, CONFIG_FOLDER, FS_WS_EXT } from '../../../constants';
import { capitalise, isWorkspacefile } from '../../../utils';
import { File, WsFiles } from '../WorkspaceViewProvider.interface';

export const convertWsFiles = (wsFiles: WsFiles, selected: string) => {
  const showPaths: string =
    workspace.getConfiguration().get('workspaceSidebar.showPaths') || ConfigShowPaths.NEVER;
  const folder: string =
    workspace.getConfiguration().get('workspaceSidebar.folder') || CONFIG_FOLDER;
  const cleanedFolder = folder.replace(os.homedir(), '~');
  const labels: string[] = [];
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
        const path =
          showPaths === ConfigShowPaths.NEVER
            ? ''
            : file
                .substring(0, lastFolder)
                .replace(os.homedir(), '~')
                .replace(cleanedFolder, '')
                .slice(1);

        labels.push(label);

        return {
          file,
          isSelected: file === selected,
          label,
          path,
        };
      }
    );

  if (showPaths === ConfigShowPaths.AS_NEEEDED) {
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
