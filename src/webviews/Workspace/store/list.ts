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
    const convertedFiles = convertWsFiles(folderPath, files, state.selected)
    const visibleFiles = getVisibleFiles(convertedFiles, state.search, state.sort)
    const fileTree = showTree ? getFileTree(folderPath, visibleFiles) : null
    const treeFolders = showTree && fileTree !== null ? getAllFoldersFromTree(fileTree) : []

    fileCount += files.length
    visibleFileCount += visibleFiles.length

    return {
      closedFolders: [],
      convertedFiles,
      files,
      fileTree,
      folderName: getLastPathSegment(folderPath),
      folderPath,
      folderPathShort: folderPath.replace(homeDir, `~`),
      treeFolders,
      visibleFiles,
    }
  })

  state.invalidReason = 'ok'
  state.isFolderInvalid = false
  state.state = 'list'
  state.fileCount = fileCount
  state.visibleFileCount = visibleFileCount
}
