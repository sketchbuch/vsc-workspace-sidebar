import * as os from 'os'
import { isSelected } from '../../../utils/fs/isSelected'
import { isWorkspaceFile } from '../../../utils/fs/isWorkspaceFile'
import { File, WsFiles } from '../WorkspaceViewProvider.interface'
import { getLabel } from './getLabel'
import { getPath } from './getPath'

export const convertWsFiles = (folder: string, wsFiles: WsFiles, selected: string): File[] => {
  const osHomeDir = os.homedir()

  const filteredFiles = [...wsFiles].filter((file) => isWorkspaceFile(file, 'file'))

  const convertedFiles = filteredFiles.map((file): File => {
    return {
      cleanedLabel: getLabel(file, true),
      file,
      isSelected: isSelected(file, selected),
      label: getLabel(file, false),
      path: getPath(file, folder, osHomeDir),
      showPath: true,
    }
  })

  return convertedFiles
}
