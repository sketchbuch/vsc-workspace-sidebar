import * as path from 'path'
import { FS_WS_FILETYPE } from '../../constants/fs'
import {
  FindFileResult,
  WorkspaceFiles,
} from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { checkFile } from './checkFile'
import { collectFilesFromFolder } from './collectFilesFromFolder'

export interface FindRootFolderFiles {
  /**
   * The depth for this root folder.
   */
  depth: number
  files: WorkspaceFiles
  /**
   * The folder with ~ replaced with the users homedir
   */
  folderPath: string
  result: FindFileResult
}

export type FindRootFolderFilesConfig = {
  excludedFolders: string[]
  excludeHiddenFolders: boolean
  folder: string
  homeDir: string
  maxDepth: number
}

export const findRootFolderFiles = async ({
  excludedFolders,
  excludeHiddenFolders,
  folder,
  homeDir,
  maxDepth,
}: FindRootFolderFilesConfig): Promise<FindRootFolderFiles> => {
  const folderPath = folder.replace(`~`, homeDir)
  const { isFile, isFolder } = checkFile(folderPath)

  if (isFolder) {
    const isHiddenExcluded =
      excludeHiddenFolders && (folderPath.includes(`${path.sep}.`) || folderPath.startsWith(`.`))

    if (isHiddenExcluded) {
      return Promise.resolve({
        depth: maxDepth,
        files: [],
        folderPath,
        result: 'is-hidden-excluded',
      })
    }

    const files = await collectFilesFromFolder({
      curDepth: 0,
      excludedFolders,
      excludeHiddenFolders,
      fileType: FS_WS_FILETYPE,
      folder: folderPath,
      maxDepth,
    })

    return Promise.resolve({
      depth: maxDepth,
      files: files,
      folderPath,
      result: files.length > 0 ? 'ok' : 'no-workspaces',
    })
  } else if (isFile) {
    return Promise.resolve({
      depth: maxDepth,
      files: [],
      folderPath,
      result: 'is-file',
    })
  }

  return Promise.resolve({
    depth: maxDepth,
    files: [],
    folderPath,
    result: 'nonexistent',
  })
}
