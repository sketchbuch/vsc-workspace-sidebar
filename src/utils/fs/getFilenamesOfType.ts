import * as path from 'path'
import { WorkspaceFiles } from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { checkFile } from './checkFile'

export const getFilenamesOfType = (
  requiredType: 'folders' | 'files',
  filenames: WorkspaceFiles,
  folder: string,
  fileType: string
) => {
  console.log('### =========')
  console.log('### requiredType', requiredType)
  console.log('### folder', folder)

  return filenames.reduce((allFiles, curFile) => {
    const curPath = path.join(folder, curFile)
    const { isFile, isFolder } = checkFile(curPath)

    console.log('### =========')
    console.log('### curFile', curFile)
    console.log('### curPath', curPath)
    console.log('### isFile', isFile)
    console.log('### isFolder', isFolder)

    if (isFile && requiredType === 'files') {
      var fileExtension = curFile.substring(curFile.lastIndexOf('.') + 1)

      if (fileExtension === fileType) {
        return [...allFiles, curPath]
      }
    } else if (isFolder && requiredType === 'folders') {
      return [...allFiles, curPath]
    }

    return allFiles
  }, [] as WorkspaceFiles)
}
