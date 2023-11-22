import { PayloadAction } from '@reduxjs/toolkit'
import * as os from 'os'
import { getShowTreeConfig } from '../../../config/treeview'
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment'
import { WorkspaceCacheRootFolders, WorkspaceState } from '../WorkspaceViewProvider.interface'
import { convertWsFiles } from '../helpers/convertWsFiles'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getVisibleFiles } from '../helpers/getVisibleFiles'

export const list = (
  state: WorkspaceState,
  action: PayloadAction<WorkspaceCacheRootFolders>
): void => {
  const homeDir = os.homedir()
  const showTree = getShowTreeConfig()
  let fileCount = 0
  let visibleFileCount = 0

  state.rootFolders = action.payload.map(({ files, folderPath }) => {
    const folderName = getLastPathSegment(folderPath)
    const convertedFiles = convertWsFiles(folderPath, files, state.selected)
    const visibleFiles = getVisibleFiles(convertedFiles, state.search)
    const fileTree = showTree ? getFileTree(folderPath, visibleFiles) : null
    const allFolders =
      showTree && fileTree !== null ? getAllFoldersFromTree(fileTree) : [folderName]

    fileCount += files.length
    visibleFileCount += visibleFiles.length

    return {
      allFolders,
      closedFolders: [],
      convertedFiles,
      files,
      fileTree,
      folderName: getLastPathSegment(folderPath),
      folderPath,
      folderPathShort: folderPath.replace(homeDir, `~`),
      result: files.length < 1 ? 'no-workspaces' : 'ok',
      visibleFiles,
    }
  })

  state.result = 'ok'
  state.isFolderInvalid = false
  state.view = 'list'
  state.fileCount = fileCount
  state.visibleFileCount = visibleFileCount
}
