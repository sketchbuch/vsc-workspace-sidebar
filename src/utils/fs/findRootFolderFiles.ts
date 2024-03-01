import { FS_WS_FILETYPE } from '../../constants/fs'
import {
  FindRootFolderFiles,
  FindRootFolderFilesConfig,
} from '../../webviews/Workspace/WorkspaceViewProvider.interface'
import { checkFile } from './checkFile'
import { collectFilesFromFolder } from './collectFilesFromFolder'

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
