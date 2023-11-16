import * as os from 'os'
import { isSelected } from '../../../utils/fs/isSelected'
import { isWorkspaceFile } from '../../../utils/fs/isWorkspaceFile'
import { File, WorkspaceFiles } from '../WorkspaceViewProvider.interface'
import { getLabel } from './getLabel'
import { getPath } from './getPath'

export const convertWsFiles = (
  folder: string,
  wsFiles: WorkspaceFiles,
  selected: string
): File[] => {
  return [...wsFiles]
    .filter((file) => isWorkspaceFile(file, 'file'))
    .map((file): File => {
      return {
        cleanedLabel: getLabel(file, true),
        file,
        isSelected: isSelected(file, selected),
        label: getLabel(file, false),
        path: getPath(file, folder, os.homedir()),
        showPath: true,
      }
    })
}
