import * as os from 'os'
import { getDepthConfig } from '../../config/general'
import { FS_WS_FILETYPE } from '../../constants/fs'
import {
  FindFileResult,
  WorkspaceFiles,
} from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { checkFile } from './checkFile'
import { collectFilesFromFolder } from './collectFilesFromFolder'

export interface FindRootFolderFiles {
  files: WorkspaceFiles
  /**
   * The folder with ~ replaced with the users homedir
   */
  folderPath: string
  result: FindFileResult
}

export const findRootFolderFiles = async (folder: string): Promise<FindRootFolderFiles> => {
  const homeDir = os.homedir()
  const folderPath = folder.replace(`~`, homeDir)

  const { isFolder } = checkFile(folderPath)

  if (isFolder) {
    const maxDepth = getDepthConfig()
    const files = await collectFilesFromFolder(folderPath, FS_WS_FILETYPE, maxDepth, 0)

    return Promise.resolve({
      files: files,
      folderPath,
      result: files.length > 0 ? 'none' : 'no-workspaces',
    })
  }

  return Promise.resolve({
    files: [],
    folderPath: '',
    result: 'invalid-folder',
  })
}
