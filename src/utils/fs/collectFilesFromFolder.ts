import * as fs from 'fs'
import { WorkspaceFiles } from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { getFilenamesOfType } from './getFilenamesOfType'
import { getLastPathSegment } from './getLastPathSegment'
import { isHiddenFile } from './isHiddenFile'

export const collectFilesFromFolder = async (
  folder: string,
  fileType: string,
  maxDepth: number,
  curDepth: number,
  excludedFolders: string[]
): Promise<WorkspaceFiles> => {
  const lastFolder = getLastPathSegment(folder)

  if (curDepth <= maxDepth && !excludedFolders.includes(lastFolder)) {
    try {
      const filenames = await fs.promises.readdir(folder).then((files) => {
        return files.reduce((allFiles: string[], curFile) => {
          if (!excludedFolders.includes(curFile)) {
            return [...allFiles, curFile]
          }

          return allFiles
        }, [])
      })

      const folders = getFilenamesOfType('folders', filenames, folder, fileType)
      let files = getFilenamesOfType('files', filenames, folder, fileType).filter(
        (file) => !isHiddenFile(file)
      )

      if (folders.length > 0) {
        for (let index = 0; index < folders.length; index++) {
          const subFiles = await collectFilesFromFolder(
            folders[index],
            fileType,
            maxDepth,
            curDepth + 1,
            excludedFolders
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
