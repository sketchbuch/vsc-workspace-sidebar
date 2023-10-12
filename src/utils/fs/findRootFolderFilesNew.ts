import * as os from 'os'
import { getDepthConfig } from '../../config/general'
import { FS_WS_FILETYPE } from '../../constants/fs'
import {
  FindFileResultNew,
  WorkspaceFiles,
} from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { checkFile } from './checkFile'
import { collectFilesFromFolder } from './collectFilesFromFolder'

export interface FindRootFolderFilesNew {
  baseFolder: string
  files: WorkspaceFiles
  result: FindFileResultNew
}

export const findRootFolderFilesNew = async (folder: string): Promise<FindRootFolderFilesNew> => {
  const maxDepth = getDepthConfig()
  const homeDir = os.homedir()
  const baseFolder = folder ? folder.replace(`~`, homeDir) : homeDir

  const { isFolder } = checkFile(baseFolder)

  if (isFolder) {
    const files = await collectFilesFromFolder(baseFolder, FS_WS_FILETYPE, maxDepth, 0)

    return Promise.resolve({
      baseFolder,
      files: files,
      result: files.length > 0 ? 'workspaces-found' : 'no-workspaces',
    })
  }

  return Promise.resolve({ baseFolder: '', files: [], result: 'invalid-folder' })
}
