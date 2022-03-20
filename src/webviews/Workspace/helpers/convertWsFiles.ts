import * as os from 'os';
import * as pathLib from 'path';
import { getCleanLabelsConfig, getFolderConfig } from '../../../config/getConfig';
import { isWorkspacefile } from '../../../utils';
import { File, WsFiles } from '../WorkspaceViewProvider.interface';
import { getLabel } from './getLabel';
import { getPath } from './getPath';
import { isSelected } from './isSelected';

export const convertWsFiles = (wsFiles: WsFiles, selected: string) => {
  const folder = getFolderConfig();
  const osHomeDir = os.homedir();
  const cleanLabels = getCleanLabelsConfig();

  const convertedFiles = [...wsFiles]
    .filter((file) => isWorkspacefile(file, 'file'))
    .map(
      (file): File => {
        const lastSlashIndex = file.lastIndexOf(pathLib.sep);
        const label = getLabel(file, cleanLabels, lastSlashIndex);
        const path = getPath(file, lastSlashIndex, folder, osHomeDir);

        return {
          file,
          isSelected: isSelected(file, selected, process.platform),
          label,
          path,
          searchLabel: label.toLowerCase(),
          showPath: true,
        };
      }
    );

  return convertedFiles;
};
