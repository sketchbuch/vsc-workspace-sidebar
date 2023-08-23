import * as os from 'os';
import { getCleanLabelsConfig, getFolderConfig } from '../../../config/getConfig';
import { isSelected } from '../../../utils/fs/isSelected';
import { isWorkspaceFile } from '../../../utils/fs/isWorkspaceFile';
import { File, WsFiles } from '../WorkspaceViewProvider.interface';
import { getLabel } from './getLabel';
import { getPath } from './getPath';

export const convertWsFiles = (wsFiles: WsFiles, selected: string) => {
  const cleanLabels = getCleanLabelsConfig();
  const folder = getFolderConfig();
  const osHomeDir = os.homedir();

  const filteredFiles = [...wsFiles].filter((file) => isWorkspaceFile(file, 'file'));

  const convertedFiles = filteredFiles.map((file): File => {
    const label = getLabel(file, cleanLabels);
    const path = getPath(file, folder, osHomeDir);

    return {
      file,
      isSelected: isSelected(file, selected, process.platform),
      label,
      path,
      showPath: true,
    };
  });

  return convertedFiles;
};
