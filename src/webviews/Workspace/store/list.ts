import { PayloadAction } from '@reduxjs/toolkit'
import * as os from 'os'
import { getShowTreeConfig } from '../../../config/treeview'
import { getLastPathSegment } from '../../../utils/fs/getLastPathSegment'
import {
  FindRootFolderFiles,
  WorkspaceCacheRootFolders,
  WorkspaceState,
} from '../WorkspaceViewProvider.interface'
import { convertWsFiles } from '../helpers/convertWsFiles'
import { getAllFoldersFromTree } from '../helpers/getAllFoldersFromTree'
import { getFileTree } from '../helpers/getFileTree'
import { getVisibleFiles } from '../helpers/getVisibleFiles'

export const list = (
  state: WorkspaceState,
  action: PayloadAction<WorkspaceCacheRootFolders>
): void => {
  console.log('### list')
  const homeDir = os.homedir()
  const showTree = getShowTreeConfig()

  const workspaceData = new Map<string, FindRootFolderFiles>()
  let fileCount = 0
  let visibleFileCount = 0

  state.rootFolders = action.payload.map(({ depth, files, folderPath }) => {
    const folderName = getLastPathSegment(folderPath) || folderPath
    const convertedFiles = convertWsFiles(folderPath, files, state.selected)
    const visibleFiles = getVisibleFiles(convertedFiles, state.search)
    const fileTree = showTree ? getFileTree(folderPath, visibleFiles) : null
    const allFolders =
      showTree && fileTree !== null ? getAllFoldersFromTree(fileTree) : [folderName]

    fileCount += files.length
    visibleFileCount += visibleFiles.length
    const result = files.length < 1 ? 'no-workspaces' : 'ok'

    workspaceData.set(folderPath, {
      depth,
      files,
      folderPath,
      result,
    })

    return {
      allFolders,
      closedFolders: [],
      convertedFiles,
      depth,
      files,
      fileTree,
      folderName: folderName,
      folderPath,
      folderPathShort: folderPath.replace(homeDir, `~`),
      result,
      visibleFiles,
    }
  })

  state.result = 'ok'
  state.view = 'list'
  state.fileCount = fileCount
  state.visibleFileCount = visibleFileCount
  state.workspaceData = workspaceData
}
