import * as fs from 'fs'
import { WorkspaceFiles } from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { getFilenamesOfType } from './getFilenamesOfType'
import { getLastPathSegment } from './getLastPathSegment'
import { isHiddenFile } from './isHiddenFile'

export type CollectFilesFromFolderConfig = {
  curDepth: number
  excludedFolders: string[]
  excludeHiddenFolders: boolean
  fileType: string
  folder: string
  maxDepth: number
}

export const collectFilesFromFolder = async ({
  curDepth,
  excludedFolders,
  excludeHiddenFolders,
  fileType,
  folder,
  maxDepth,
}: CollectFilesFromFolderConfig): Promise<WorkspaceFiles> => {
  const isRoot = curDepth === 0
  const lastFolder = getLastPathSegment(folder)
  let isFolderValid = isRoot ? true : !excludedFolders.includes(lastFolder)

  if (!isRoot && isFolderValid && excludeHiddenFolders) {
    isFolderValid = !isHiddenFile(lastFolder)
  }

  if (curDepth <= maxDepth && isFolderValid) {
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
        (file) => isRoot || !excludeHiddenFolders || !isHiddenFile(file)
      )

      if (folders.length > 0) {
        for (let index = 0; index < folders.length; index++) {
          const subFiles = await collectFilesFromFolder({
            curDepth: curDepth + 1,
            excludedFolders,
            excludeHiddenFolders,
            fileType,
            folder: folders[index],
            maxDepth,
          })
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
