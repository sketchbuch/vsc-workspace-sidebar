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
  baseFolder: string
  files: WorkspaceFiles
  result: FindFileResult
}

export const findRootFolderFiles = async (folder: string): Promise<FindRootFolderFiles> => {
  const homeDir = os.homedir()
  const baseFolder = folder ? folder.replace(`~`, homeDir) : homeDir

  const { isFolder } = checkFile(baseFolder)

  if (isFolder) {
    const maxDepth = getDepthConfig()
    const files = await collectFilesFromFolder(baseFolder, FS_WS_FILETYPE, maxDepth, 0)

    return Promise.resolve({
      baseFolder,
      files: files,
      result: files.length > 0 ? 'ok' : 'no-workspaces',
    })
  }

  return Promise.resolve({ baseFolder: '', files: [], result: 'invalid-folder' })
}
