import * as fs from 'fs'
import { getExcludedFoldersConfig } from '../../config/folders'
import { WorkspaceFiles } from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { getFilenamesOfType } from './getFilenamesOfType'
import { isHiddenFile } from './isHiddenFile'

export const collectFilesFromFolder = async (
  folder: string,
  fileType: string,
  maxDepth: number,
  curDepth: number
): Promise<WorkspaceFiles> => {
  const excludedFoldersConfig = getExcludedFoldersConfig()

  if (curDepth <= maxDepth) {
    try {
      const filenames = await fs.promises.readdir(folder) /* .then((files) => {
        return files.reduce((allFiles: string[], curFile) => {
          if (isHiddenFile(curFile)) {
            console.log('### hidden', curFile)
          }
          if ( !isHiddenFile(curFile) &&  !excludedFoldersConfig.includes(curFile)) {
            return [...allFiles, curFile]
          }

          return allFiles
        }, [])
      }) */

      const folders = getFilenamesOfType('folders', filenames, folder, fileType).filter(
        (file) => !excludedFoldersConfig.includes(file)
      )
      let files = getFilenamesOfType('files', filenames, folder, fileType).filter(
        (file) => !isHiddenFile(file)
      )

      if (folders.length > 0) {
        for (let index = 0; index < folders.length; index++) {
          const subFiles = await collectFilesFromFolder(
            folders[index],
            fileType,
            maxDepth,
            curDepth + 1
          )
          files = [...files, ...subFiles]
        }
      }

      return files
    } catch (err) {
      return []
    }
  }

  return []
}
